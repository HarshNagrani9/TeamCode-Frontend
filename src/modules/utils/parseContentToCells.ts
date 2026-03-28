/**
 * parseContentToCells.ts
 * 
 * Splits a SubModule's markdown content string into an ordered array
 * of cells (markdown or code), mimicking a Jupyter notebook layout.
 */

export interface MarkdownCell {
  type: 'markdown';
  content: string;
}

export interface CodeCell {
  type: 'code';
  language: string;
  initialCode: string;
  id: string;
}

export type NotebookCellData = MarkdownCell | CodeCell;

let cellCounter = 0;

/**
 * Resets the cell ID counter. Call this when switching sub-modules
 * to get consistent IDs.
 */
export function resetCellCounter(): void {
  cellCounter = 0;
}

/**
 * Parses a content string containing markdown text interleaved with
 * fenced code blocks into an array of NotebookCellData.
 * 
 * Example input:
 *   "Some explanation\n\n```python\nprint('hi')\n```\n\nMore text"
 * 
 * Example output:
 *   [
 *     { type: 'markdown', content: 'Some explanation' },
 *     { type: 'code', language: 'python', initialCode: "print('hi')", id: 'cell-0' },
 *     { type: 'markdown', content: 'More text' }
 *   ]
 */
export function parseContentToCells(content: string): NotebookCellData[] {
  const cells: NotebookCellData[] = [];
  cellCounter = 0;

  // Regex to find fenced code blocks: ```language\n...code...\n```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Everything before this code block is markdown
    const markdownBefore = content.slice(lastIndex, match.index).trim();
    if (markdownBefore) {
      cells.push({ type: 'markdown', content: markdownBefore });
    }

    // The code block itself
    const language = match[1] || 'python';
    const code = match[2].trim();
    if (code) {
      cells.push({
        type: 'code',
        language,
        initialCode: code,
        id: `cell-${cellCounter++}`,
      });
    }

    lastIndex = match.index + match[0].length;
  }

  // Any remaining markdown after the last code block
  const remaining = content.slice(lastIndex).trim();
  if (remaining) {
    cells.push({ type: 'markdown', content: remaining });
  }

  return cells;
}
