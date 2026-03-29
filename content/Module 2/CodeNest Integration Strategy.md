# CodeNest Integration Strategy: Data Preprocessing Course

## Overview

This document outlines the optimal architecture for integrating the Data Preprocessing course (NumPy, Pandas, Matplotlib, Seaborn) into CodeNest — your article-and-IDE-based e-learning platform built with Next.js (SSG/ISR) and FastAPI.

---

## 1. Content Structure: Separating Theory & Code

### The Content Schema

Every lesson should be stored as **structured MDX** with explicit block-type markers. This is the most important architectural decision because it determines how your frontend renders theory vs code, and how your agent parses content.

```mdx
---
title: "NumPy Array Indexing"
chapter: 1
section: "theory"
order: 3
tags: ["numpy", "indexing", "slicing"]
difficulty: "beginner"
estimated_time: 15
---

<Theory>
## Boolean Indexing (Filtering)

Boolean indexing is one of NumPy's most powerful features and the foundation
of data filtering in Pandas. When you write `a[a > 20]`, NumPy first
evaluates `a > 20` to produce a boolean array, then selects only the
elements where the value is True.

**Critical syntax note:** you must use `&` instead of `and`, `|` instead
of `or`, and each condition must be in parentheses.
</Theory>

<CodeSnippet
  id="numpy-bool-index-01"
  title="Filtering with Boolean Masks"
  language="python"
  runnable={true}
  expectedOutput="[23 42 31]"
>
{`import numpy as np

a = np.array([15, 23, 8, 42, 7, 31, 19])

# Create a boolean mask
mask = a > 20
print(mask)        # [False  True False  True False  True False]

# Use the mask to filter
print(a[mask])     # [23 42 31]
print(a[a > 20])   # [23 42 31] — shorthand
`}
</CodeSnippet>

<Theory>
You can combine multiple conditions using `&` (and), `|` (or), and `~` (not).
Each individual condition **must** be wrapped in parentheses.
</Theory>

<CodeSnippet
  id="numpy-bool-index-02"
  title="Combining Conditions"
  language="python"
  runnable={true}
>
{`import numpy as np

a = np.array([15, 23, 8, 42, 7, 31, 19])

# AND: both conditions must be true
print(a[(a > 10) & (a < 30)])  # [15 23 19]

# NOT: invert the condition
print(a[~(a > 20)])            # [15 8 7 19]
`}
</CodeSnippet>

<Exercise
  id="ex-numpy-bool-01"
  title="Practice: Filter an Array"
  difficulty="easy"
>
  <Prompt>
  Given `data = np.array([3, 7, 1, 9, 4, 6, 2, 8, 5])`, write code to
  filter out values that are between 3 and 7 (inclusive).
  </Prompt>
  <Hint>Use `(data >= 3) & (data <= 7)` as the boolean mask.</Hint>
  <Solution language="python">
{`import numpy as np
data = np.array([3, 7, 1, 9, 4, 6, 2, 8, 5])
result = data[(data >= 3) & (data <= 7)]
print(result)  # [3 7 4 6 5]
`}
  </Solution>
</Exercise>
```

### Why This Structure Works

1. **Explicit block types** (`<Theory>`, `<CodeSnippet>`, `<Exercise>`) make parsing trivial — both for your frontend renderer and any AI agent
2. **`runnable={true}`** flag tells the IDE component which snippets should have a Run button
3. **`expectedOutput`** enables auto-grading for exercises
4. **`id` attributes** enable analytics (which snippets are users running? which exercises are they struggling with?)
5. **MDX compiles to React** — each custom tag maps to a React component

---

## 2. Browser-Based Python IDE Libraries

For a no-video, article+IDE platform, you need an in-browser Python execution environment. Here are the options ranked by suitability for CodeNest:

### Option A: Pyodide (Recommended for CodeNest)

**What:** Full CPython 3.11+ interpreter compiled to WebAssembly, runs entirely in the browser.

**Why it's best for CodeNest:**
- Runs NumPy, Pandas, Matplotlib, Seaborn **natively** in the browser
- Zero backend infrastructure needed for code execution
- Matplotlib renders to HTML canvas automatically
- User code never leaves their browser (privacy)

```bash
npm install pyodide
```

```tsx
// components/PythonIDE.tsx
import { useEffect, useRef, useState } from 'react';

interface PythonIDEProps {
  code: string;
  runnable?: boolean;
  expectedOutput?: string;
}

export function PythonIDE({ code, runnable = true, expectedOutput }: PythonIDEProps) {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodide, setPyodide] = useState<any>(null);

  useEffect(() => {
    // Load Pyodide once
    async function loadPy() {
      const py = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
      });
      // Pre-load data science packages
      await py.loadPackage(['numpy', 'pandas', 'matplotlib']);
      setPyodide(py);
    }
    loadPy();
  }, []);

  async function runCode(userCode: string) {
    if (!pyodide) return;
    setIsRunning(true);
    try {
      // Redirect stdout
      pyodide.runPython(`
        import sys, io
        sys.stdout = io.StringIO()
      `);

      await pyodide.runPythonAsync(userCode);

      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(stdout);
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    }
    setIsRunning(false);
  }

  return (
    <div className="ide-container">
      <CodeEditor value={code} onChange={...} />
      {runnable && (
        <button onClick={() => runCode(code)} disabled={isRunning}>
          {isRunning ? 'Running...' : '▶ Run'}
        </button>
      )}
      <button onClick={() => navigator.clipboard.writeText(code)}>
        📋 Copy
      </button>
      {output && <pre className="output">{output}</pre>}
    </div>
  );
}
```

**Package support:**
- numpy ✅ (native WASM build)
- pandas ✅ (native WASM build)
- matplotlib ✅ (renders to canvas/HTML)
- seaborn ✅ (via micropip: `await micropip.install('seaborn')`)
- scikit-learn ✅

**Limitations:**
- Initial load: ~8-15 MB download (cache after first load)
- No file system access (use virtual FS)
- Some C-extension packages may not be available

### Option B: JupyterLite (Embedded Jupyter in Browser)

**What:** A full Jupyter Notebook running entirely in the browser via Pyodide + WASM.

```bash
npm install @jupyterlite/server
```

**Pros:** Full .ipynb notebook experience, cell-by-cell execution, rich output
**Cons:** Heavy (~20MB), complex to embed, notebook UI may conflict with your article layout

**Best for:** If you want to offer full notebook experiences alongside articles

### Relevant npm Libraries for the Code Editor

| Library | Purpose | Install |
|---------|---------|---------|
| `@monaco-editor/react` | VS Code's editor as a React component | `npm i @monaco-editor/react` |
| `@codemirror/lang-python` | CodeMirror 6 with Python syntax | `npm i codemirror @codemirror/lang-python` |
| `pyodide` | Python runtime in WASM | `npm i pyodide` |
| `react-syntax-highlighter` | Read-only code display with copy | `npm i react-syntax-highlighter` |
| `xterm` | Terminal emulator for output | `npm i xterm` |

### Recommended Stack for CodeNest

```
Article Content: MDX (compiled at build time via Next.js)
Code Editor:    Monaco Editor (@monaco-editor/react)
Python Runtime: Pyodide (WebAssembly, client-side)
Plot Rendering: Pyodide's built-in Matplotlib backend
Copy Button:    navigator.clipboard.writeText()
```

---

## 3. Component Architecture

```
<Lesson>
  ├── <TheoryBlock>           → Rendered MDX prose (markdown)
  │    └── styled article text, images, callouts
  │
  ├── <CodeSnippet>           → Read-only syntax-highlighted code
  │    ├── Copy button (clipboard API)
  │    ├── Run button (Pyodide execution)
  │    └── Output panel (collapsible)
  │
  ├── <InteractiveIDE>        → Full editable Monaco editor
  │    ├── Pre-loaded starter code
  │    ├── Run / Reset / Copy buttons
  │    ├── Output panel with Matplotlib canvas
  │    └── Optional: expected output checker
  │
  ├── <Exercise>              → Challenge with scaffolding
  │    ├── Problem statement
  │    ├── Hint (toggle reveal)
  │    ├── InteractiveIDE (editable)
  │    ├── Solution (toggle reveal)
  │    └── Auto-check (compare output to expected)
  │
  └── <Note> / <Warning>      → Callout boxes
```

### Key UI/UX Decisions

1. **Read-only snippets** (in theory sections): Use `react-syntax-highlighter` with a copy button. No run button. These are for reading and understanding.

2. **Runnable snippets** (practice sections): Use Monaco Editor + Pyodide. Run button, copy button, output panel. Users can edit and experiment.

3. **Exercises**: Editable IDE with starter code, hidden hints/solutions, and optional auto-grading via output comparison.

4. **Matplotlib output**: Pyodide can render Matplotlib to a PNG data URL. Capture it and display as an `<img>` below the IDE.

```python
# In Pyodide, capture matplotlib output
import matplotlib.pyplot as plt
import io, base64

fig, ax = plt.subplots()
ax.plot([1, 2, 3], [1, 4, 9])

buf = io.BytesIO()
fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
buf.seek(0)
img_data = base64.b64encode(buf.read()).decode('utf-8')
# Send img_data back to JS and render as <img src="data:image/png;base64,{img_data}">
```

---

## 4. Instructing an AI Agent to Separate Theory & Code

If you're using an AI agent (like Claude or GPT) to parse raw lesson content into the structured format above, here's how to instruct it:

### System Prompt for Content Parsing Agent

```
You are a content structuring agent for CodeNest, a Python e-learning platform.

Your job is to take raw lesson content (text + code) and output structured MDX
with explicit block types.

RULES:
1. Wrap all explanatory prose in <Theory> blocks
2. Wrap all code examples in <CodeSnippet> blocks with these attributes:
   - id: unique kebab-case identifier (e.g., "numpy-reshape-01")
   - title: short descriptive title
   - language: "python"
   - runnable: true if the code can be executed standalone, false if it's
     a fragment or requires context
   - expectedOutput: (optional) the expected print output

3. Wrap exercises in <Exercise> blocks with:
   - <Prompt>: the question
   - <Hint>: guidance (wrapped in a toggle)
   - <Solution>: the answer code

4. Code inside <CodeSnippet> must be COMPLETE and SELF-CONTAINED:
   - Always include necessary imports (import numpy as np)
   - Never reference variables from other snippets
   - Each snippet should run independently

5. Theory blocks should:
   - Explain WHAT the code does BEFORE the snippet
   - Explain WHY and HOW after the snippet
   - Use inline code formatting for identifiers: `np.array()`
   - Include practical tips and common pitfalls

6. Add <Note> blocks for important warnings or tips

OUTPUT FORMAT: Valid MDX with frontmatter.
```

### Example Agent Input/Output

**Input (raw content):**
```
NumPy arrays support boolean indexing. You can create a mask:
a = np.array([1, 2, 3, 4, 5])
mask = a > 3
print(a[mask])  # [4 5]
This is useful for filtering data.
```

**Agent Output (structured MDX):**
```mdx
<Theory>
## Boolean Indexing

NumPy arrays support **boolean indexing**, which lets you filter elements
based on a condition. You create a boolean mask (an array of True/False
values) and use it to select only the matching elements.
</Theory>

<CodeSnippet
  id="numpy-bool-basic"
  title="Basic Boolean Indexing"
  language="python"
  runnable={true}
  expectedOutput="[4 5]"
>
{`import numpy as np

a = np.array([1, 2, 3, 4, 5])
mask = a > 3           # [False False False  True  True]
print(a[mask])         # [4 5]
`}
</CodeSnippet>

<Theory>
This is the foundation of data filtering in Pandas. The pattern
`array[condition]` returns only elements where the condition is `True`.
</Theory>
```

### Detection Heuristics for the Agent

Tell your agent to classify content blocks using these signals:

| Signal | Classification |
|--------|---------------|
| Prose explaining a concept, no code | `<Theory>` |
| Lines starting with `>>>`, `import`, `print(`, variable assignments | `<CodeSnippet>` |
| "Exercise", "Try this", "Your turn", numbered problems | `<Exercise>` |
| "Note:", "Warning:", "Important:", "Tip:" | `<Note>` or `<Warning>` |
| Code block immediately followed by "# Output:" comment | `runnable={true}` + extract expectedOutput |
| Code with `...` or `# your code here` | Exercise starter code |

---

## 5. Recommended Implementation Roadmap

### Phase 1: Content Pipeline (Week 1-2)
1. Convert the PDF guide into structured MDX files (one per lesson section)
2. Set up MDX processing in Next.js with custom components
3. Create the `<Theory>`, `<CodeSnippet>`, `<Exercise>` React components
4. Implement syntax highlighting with copy button

### Phase 2: IDE Integration (Week 3-4)
1. Integrate Pyodide as a lazy-loaded module (don't block page load)
2. Build the `<InteractiveIDE>` component with Monaco Editor
3. Add Run button → Pyodide execution → output display pipeline
4. Handle Matplotlib rendering (PNG capture → img display)

### Phase 3: Exercises & Grading (Week 5-6)
1. Build exercise components with hint/solution toggles
2. Implement output comparison for auto-checking
3. Add progress tracking (which exercises completed)
4. Connect to FastAPI backend for saving progress

### Phase 4: The Arena Integration (Week 7+)
1. Data preprocessing challenges for The Arena
2. ELO-ranked leaderboard for preprocessing speed/accuracy
3. Timed challenges: "Clean this dataset in 5 minutes"

---

## 6. File Structure for the Course

```
content/
  data-preprocessing/
    meta.json                    # Course metadata, ordering
    ch01-numpy/
      01-what-is-numpy.mdx       # Theory + snippets
      02-creating-arrays.mdx
      03-indexing-slicing.mdx
      04-operations.mdx
      05-reshaping.mdx
      06-missing-data.mdx
      07-exercises.mdx           # Practice section
    ch02-pandas/
      01-what-is-pandas.mdx
      02-series-dataframe.mdx
      03-selecting-data.mdx
      04-missing-data.mdx
      05-transformation.mdx
      06-groupby-merge.mdx
      07-exercises.mdx
    ch03-visualization/
      01-matplotlib-basics.mdx
      02-plot-types.mdx
      03-subplots.mdx
      04-seaborn-distributions.mdx
      05-seaborn-relationships.mdx
      06-heatmaps.mdx
      07-exercises.mdx
    ch04-project/
      01-load-explore.mdx
      02-clean.mdx
      03-eda.mdx
      04-feature-engineering.mdx
      05-conclusions.mdx
```

Each `.mdx` file is a self-contained lesson that compiles to a page via Next.js SSG.

---

## Summary

| Decision | Recommendation |
|----------|---------------|
| Content format | MDX with `<Theory>`, `<CodeSnippet>`, `<Exercise>` custom tags |
| Code editor | `@monaco-editor/react` (VS Code in the browser) |
| Python runtime | Pyodide (WASM, runs NumPy/Pandas/Matplotlib client-side) |
| Read-only code | `react-syntax-highlighter` + clipboard copy button |
| Plot rendering | Pyodide Matplotlib → base64 PNG → `<img>` tag |
| Content parsing | AI agent with structured system prompt (see Section 4) |
| Content storage | MDX files in git, compiled at build time via Next.js SSG/ISR |
| Progress tracking | FastAPI backend + database |
