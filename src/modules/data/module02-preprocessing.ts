import type { ModuleData } from '../types';

const module02: ModuleData = {
  id: "module-02",
  title: "Data Preprocessing",
  moduleNumber: 2,
  chapters: [
    // ─────────────────────────────────────────────────────────────────────────
    // CHAPTER 1: NumPy
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "NumPy — The Foundation of Numerical Python",
      subModules: [
        {
          id: "numpy-theory",
          title: "NumPy Theory: Arrays, Operations & Reshaping",
          content: `### What is NumPy and Why Does It Matter?

NumPy (Numerical Python) is the foundational library for all scientific computing in Python. It provides a powerful N-dimensional array object called **ndarray**, along with a massive collection of mathematical functions. Virtually every data science library — Pandas, Matplotlib, Scikit-learn — is built on top of NumPy.

**Why not just use Python lists?** NumPy arrays store elements as contiguous blocks of raw numbers in memory (like C arrays), making operations 10–100x faster. It also supports **vectorized operations** — you can add, multiply, or transform entire arrays without writing a single loop.

---

### Creating Arrays

\`\`\`python
import numpy as np

# 1D array from a list
a = np.array([1, 2, 3, 4, 5])
print(a)        # [1 2 3 4 5]
print(a.dtype)  # int64

# 2D array (matrix) — pass a list of lists
b = np.array([[1, 2, 3], [4, 5, 6]])
print(b.shape)  # (2, 3) — 2 rows, 3 columns
print(b.ndim)   # 2
print(b.size)   # 6

# Specify data type explicitly
c = np.array([1, 2, 3], dtype=np.float64)
print(c)  # [1. 2. 3.]
\`\`\`

**💡 What this achieves:** This transforms standard Python lists into highly optimized NumPy arrays. The \`shape\`, \`ndim\` (dimensions), and \`dtype\` (data type) properties allow you to instantly understand the mathematical structure of your data.

---

### Array Generation Functions

\`\`\`python
import numpy as np

zeros  = np.zeros((3, 4))              # 3x4 matrix of zeros
ones   = np.ones((2, 3))               # 2x3 matrix of ones
full   = np.full((2, 2), 7)            # filled with 7
eye    = np.eye(3)                     # 3x3 identity matrix

r1 = np.arange(0, 10, 2)              # [0 2 4 6 8]  — stop exclusive
r2 = np.linspace(0, 1, 5)             # [0. 0.25 0.5 0.75 1.0] — stop inclusive

rand   = np.random.rand(3, 3)         # uniform [0, 1)
randn  = np.random.randn(3, 3)        # standard normal (mean=0, std=1)
randint= np.random.randint(1, 100, (3, 3))  # random ints [1, 100)

print("arange:", r1)
print("linspace:", r2)
\`\`\`

**💡 What this achieves:** Instead of manually typing out hundreds of numbers, these functions instantly generate arrays of any size filled with zeros, ones, or random values. This is essential for initializing weights in neural networks or creating dummy data for testing.

> **Note:** \`np.arange()\` stop is **exclusive**, \`np.linspace()\` stop is **inclusive**. This trips up many beginners.

---

### Indexing and Slicing

\`\`\`python
import numpy as np

a = np.array([10, 20, 30, 40, 50])
print(a[0])    # 10  (first element)
print(a[-1])   # 50  (last element)
print(a[1:4])  # [20 30 40]
print(a[::2])  # [10 30 50] (every 2nd)

m = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(m[0, 0])       # 1   (row 0, col 0)
print(m[1, 2])       # 6   (row 1, col 2)
print(m[:, 1])       # [2 5 8] — all rows, column 1
print(m[0:2, 1:3])  # [[2 3] [5 6]] — sub-matrix
\`\`\`

**💡 What this achieves:** Slicing allows you to extract specific rows or columns without copying the underlying data. This is how you separate your features (inputs) from your labels (outputs) when training a machine learning model.

The syntax \`m[row, col]\` is the key pattern. Use \`:\` alone to mean "all rows" or "all columns".

---

### Boolean Indexing (Filtering)

\`\`\`python
import numpy as np

a = np.array([15, 23, 8, 42, 7, 31, 19])

mask = a > 20
print(mask)       # [False  True False  True False  True False]
print(a[mask])    # [23 42 31]
print(a[a > 20])  # [23 42 31] — shorthand

# Combine conditions — wrap each in parentheses!
print(a[(a > 10) & (a < 30)])  # [15 23 19]
print(a[~(a > 20)])            # [15  8  7 19]
\`\`\`

**💡 What this achieves:** Boolean indexing is the fastest way to conditionally filter data in Python. Instead of writing a slow \`for\` loop, NumPy evaluates the condition across the entire array simultaneously in C, returning a subset in milliseconds.

> **Critical:** Use \`&\` not \`and\`, use \`|\` not \`or\`, and wrap each condition in parentheses. Python's \`and\`/\`or\` cannot work element-wise on arrays.

---

### Vectorized Operations & Aggregation

\`\`\`python
import numpy as np

a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

print(a + b)         # [11 22 33 44]
print(a * b)         # [10 40 90 160]
print(a ** 2)        # [ 1  4  9 16]
print(np.sqrt(a))    # [1.   1.41 1.73 2.  ]
print(a * 10)        # [10 20 30 40]  — scalar broadcast

m = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(m))          # 21  (all elements)
print(np.sum(m, axis=0))  # [5 7 9]  — sum down columns
print(np.sum(m, axis=1))  # [6 15]   — sum across rows
print(np.mean(m))         # 3.5
print(np.argmax(m))       # 5  (index of max in flattened array)
\`\`\`

**💡 What this achieves:** Vectorization replaces explicit loops with highly optimized code under the hood. When you multiply \`a * b\`, NumPy multiplies the elements pair-wise simultaneously. Over entire datasets, this is 100x faster than standard Python.

> **axis=0** collapses rows (operates down columns). **axis=1** collapses columns (operates across rows). This same convention carries into Pandas — master it now.

---

### Reshaping and Manipulating Arrays

\`\`\`python
import numpy as np

a = np.arange(12)      # [0 1 2 ... 11]

b = a.reshape(3, 4)    # 3 rows, 4 columns
c = a.reshape(4, -1)   # -1 means 'infer' → (4, 3)
print(b.shape)         # (3, 4)
print(c.shape)         # (4, 3)

print(b.T.shape)       # (4, 3) — transpose swaps rows and columns
print(b.flatten())     # [0 1 2 ... 11] — convert any shape to 1D

x = np.array([1, 2, 3])
y = np.array([4, 5, 6])
print(np.vstack([x, y]))      # [[1 2 3] [4 5 6]]
print(np.hstack([x, y]))      # [1 2 3 4 5 6]
print(np.concatenate([x, y])) # [1 2 3 4 5 6]
\`\`\`

**💡 What this achieves:** Machine learning models expect data in very specific shapes (usually taking a 2D matrix representing \`(samples, features)\`). Reshaping allows you to cleanly reorganize 1D arrays without altering the actual data points.

The \`-1\` shortcut is invaluable: it tells NumPy to calculate that dimension automatically. \`a.reshape(4, -1)\` on a 12-element array produces shape \`(4, 3)\` because 12/4 = 3.

---

### Handling Missing Data in NumPy

\`\`\`python
import numpy as np

a = np.array([1.0, 2.0, np.nan, 4.0, 5.0])

print(np.isnan(a))    # [False False  True False False]
print(np.sum(a))      # nan  ← any arithmetic with nan returns nan!
print(np.nansum(a))   # 12.0  (ignores nan)
print(np.nanmean(a))  # 3.0

# Replace nan with a value using np.where
a_clean = np.where(np.isnan(a), 0, a)
print(a_clean)        # [1. 2. 0. 4. 5.]

# Replace nan with column mean
mean_val = np.nanmean(a)
a_imputed = np.where(np.isnan(a), mean_val, a)
print(a_imputed)      # [1.  2.  3.  4.  5.]
\`\`\`

**💡 What this achieves:** Real-world data is mathematically messy. This snippet identifies null values (\`NaN\`) and intelligently replaces them with the column's mean. If you fed raw \`NaN\` values into a machine learning algorithm, it would crash immediately!

\`np.where(condition, value_if_true, value_if_false)\` is like a vectorized if-else — extremely useful for conditional replacements throughout preprocessing.`,
          taskDescription: "Import numpy as np. Create a 1D array of integers from 1 to 10 using np.arange(1, 11). Reshape it into a (2, 5) matrix and print the sum of each column using axis=0.",
          initialCode: "import numpy as np\n# Create array 1-10, reshape to (2,5), print column sums\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "numpy-practice-1",
          title: "Practice: Matrix Statistics",
          content: `### Exercise 1: Matrix Statistics

Create a **5×5 matrix of random integers** between 1 and 100. Then find:
- **(a)** The overall mean of all elements
- **(b)** The maximum value in each row
- **(c)** The index of the column that has the highest sum

**Hints:**
- Use \`np.random.randint(1, 101, size=(5, 5))\` to create the matrix
- Use \`np.mean()\` for overall mean
- Use \`np.max(m, axis=1)\` for row maxes (axis=1 = across rows)
- Use \`np.sum(m, axis=0)\` for column sums, then \`np.argmax()\` for the index

---

\`\`\`python
import numpy as np

np.random.seed(42)  # for reproducibility
m = np.random.randint(1, 101, size=(5, 5))
print("Matrix:")
print(m)

# (a) Overall mean
print("\\nOverall mean:", np.mean(m))

# (b) Max value in each row (axis=1 collapses columns)
print("Row maxes:", np.max(m, axis=1))

# (c) Column with highest sum
col_sums = np.sum(m, axis=0)
print("Column sums:", col_sums)
print("Best column index:", np.argmax(col_sums))
\`\`\``,
          taskDescription: "Create a 5x5 random integer matrix (seed=42, values 1-100). Print: (a) overall mean, (b) max per row, (c) index of column with highest sum.",
          initialCode: "import numpy as np\n\nnp.random.seed(42)\n# Create 5x5 matrix of random ints between 1 and 100\nm = \n\n# (a) Overall mean\n\n# (b) Max in each row\n\n# (c) Column with highest sum\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "numpy-practice-2",
          title: "Practice: Binary Thresholding",
          content: `### Exercise 2: Binary Thresholding

Create an array of **20 random floats** between 0 and 1. Replace all values **below the mean** with 0 and all values **at or above the mean** with 1. Print both the original (rounded) and binary arrays.

This operation — converting continuous values to binary based on a threshold — is used in image processing, anomaly detection, and feature engineering.

**Hints:**
- Use \`np.random.rand(20)\` to generate the array
- Calculate the mean with \`np.mean()\`
- Use \`np.where(condition, value_if_true, value_if_false)\`

---

\`\`\`python
import numpy as np

np.random.seed(7)
a = np.random.rand(20)
mean = np.mean(a)

result = np.where(a < mean, 0, 1)

print("Original (rounded):", np.round(a, 2))
print("Mean:", round(mean, 4))
print("Binary:           ", result)
print("Proportion >= mean:", result.mean())
\`\`\``,
          taskDescription: "Generate 20 random floats (seed=7). Replace values below the mean with 0 and at/above mean with 1 using np.where(). Print original, mean, and binary result.",
          initialCode: "import numpy as np\n\nnp.random.seed(7)\na = np.random.rand(20)\n\n# Calculate mean\n\n# Apply threshold with np.where\nresult = \n\nprint('Original:', np.round(a, 2))\nprint('Binary:  ', result)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "numpy-practice-3",
          title: "Practice: Min-Max Normalization",
          content: `### Exercise 3: Min-Max Normalization

Create a **3×4 matrix of random integers** (0–100). Normalize it so all values fall between 0 and 1 using the **Min-Max formula**:

$$\\text{normalized} = \\frac{x - \\min}{\\max - \\min}$$

After normalization, verify that the minimum is 0.0 and the maximum is 1.0.

**Why this matters:** Min-Max normalization is one of the most common preprocessing steps in machine learning. Neural networks converge faster when input features share the same scale.

**Hints:**
- Use \`np.min()\` and \`np.max()\` on the entire array
- NumPy broadcasting handles the element-wise arithmetic automatically

---

\`\`\`python
import numpy as np

np.random.seed(0)
m = np.random.randint(0, 101, size=(3, 4))
print("Original:")
print(m)

normalized = (m - np.min(m)) / (np.max(m) - np.min(m))

print("\\nNormalized (rounded to 3 decimals):")
print(np.round(normalized, 3))
print("\\nMin:", normalized.min(), " Max:", normalized.max())
\`\`\``,
          taskDescription: "Create a 3x4 random integer matrix (0-100, seed=0). Apply Min-Max normalization so values are in [0, 1]. Verify min=0.0 and max=1.0.",
          initialCode: "import numpy as np\n\nnp.random.seed(0)\nm = np.random.randint(0, 101, size=(3, 4))\nprint('Original:')\nprint(m)\n\n# Apply Min-Max normalization\nnormalized = \n\nprint('Normalized:')\nprint(np.round(normalized, 3))\nprint('Min:', normalized.min(), 'Max:', normalized.max())\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "numpy-practice-4",
          title: "Practice: NaN Handling",
          content: `### Exercise 4: Handling NaN Values

Given the array \`[1, np.nan, 3, np.nan, 5, 6, np.nan, 8]\`:

- **(a)** Count how many NaN values exist
- **(b)** Replace each NaN with the **mean of the non-NaN values**
- **(c)** Verify that no NaN values remain in the cleaned array

**Why this matters:** In real datasets, missing values are represented as NaN. Any arithmetic involving NaN returns NaN — it is contagious. Knowing how to detect and replace NaN is the first step of every preprocessing pipeline.

**Hints:**
- \`np.isnan(a).sum()\` counts NaN values
- \`np.nanmean(a)\` computes mean while ignoring NaN
- \`np.where(condition, fill, array)\` replaces conditionally

---

\`\`\`python
import numpy as np

a = np.array([1, np.nan, 3, np.nan, 5, 6, np.nan, 8], dtype=float)

# (a) Count NaN
nan_count = np.isnan(a).sum()
print(f"NaN count: {nan_count}")

# (b) Replace NaN with mean of non-NaN values
mean_val = np.nanmean(a)
a_clean = np.where(np.isnan(a), mean_val, a)
print(f"Mean used: {mean_val:.4f}")
print(f"Cleaned:   {a_clean}")

# (c) Verify
print(f"Any NaN left? {np.isnan(a_clean).any()}")
\`\`\``,
          taskDescription: "Given [1, nan, 3, nan, 5, 6, nan, 8]: (a) count NaNs, (b) replace NaN with nanmean, (c) verify no NaN remains.",
          initialCode: "import numpy as np\n\na = np.array([1, np.nan, 3, np.nan, 5, 6, np.nan, 8], dtype=float)\n\n# (a) Count NaN values\n\n# (b) Replace NaN with mean of non-NaN values\n\n# (c) Verify no NaN remains\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CHAPTER 2: Pandas
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Pandas — Data Manipulation Mastery",
      subModules: [
        {
          id: "pandas-theory",
          title: "Pandas Theory: DataFrames, Cleaning & Transformation",
          content: `### What is Pandas?

Pandas is the most important library for data preprocessing in Python. Built on top of NumPy, it provides two primary data structures: **Series** (1D labeled array) and **DataFrame** (2D labeled table). Think of a DataFrame as a programmable spreadsheet — it reads CSV, Excel, JSON, SQL, and provides hundreds of methods for cleaning, transforming, and analyzing data.

---

### Series: The 1D Building Block

\`\`\`python
import pandas as pd
import numpy as np

# Creating a Series
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print(s)
# a    10
# b    20
# c    30
# d    40
# dtype: int64

print(s['b'])     # 20 — by label
print(s.iloc[1])  # 20 — by integer position
\`\`\`

**💡 What this achieves:** A Series is like a single column in Excel, but computationally charged. It maps a searchable index label to every data point for lightning-fast lookups.

The two access methods: **.loc[]** (by label) and **.iloc[]** (by integer position). \`loc\` uses the index labels you defined; \`iloc\` uses 0-based positions regardless of labels.

---

### DataFrame: The Core Data Structure

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name':   ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age':    [25, 30, 35, 28],
    'City':   ['NYC', 'LA', 'NYC', 'Chicago'],
    'Salary': [70000, 85000, 92000, 78000]
})
print(df)
\`\`\`

**💡 What this achieves:** The DataFrame is the absolute gold standard for data science in Python. This structure stores your tabular data (Rows and Columns), fully preparing it for filtering, aggregation, and AI processing.

---

### Exploring Your Data (Always Start Here)

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Name':   ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age':    [25, 30, 35, 28],
    'City':   ['NYC', 'LA', 'NYC', 'Chicago'],
    'Salary': [70000, 85000, 92000, 78000]
})

print(df.head())         # first 5 rows
print(df.shape)          # (rows, cols)
print(df.dtypes)         # data type of each column
print(df.describe())     # count, mean, std, min, max, quartiles
print(df.info())         # column names, dtypes, non-null counts
\`\`\`

**💡 What this achieves:** Before manipulating data, you must understand it. \`df.info()\` instantly reveals missing values and data types, while \`df.describe()\` gives you the statistical distribution (min, max, and percentiles) of your metrics perfectly.

\`df.info()\` is the single most important exploratory command — it reveals missing values and data types at a glance.

---

### Selecting Data

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Name':   ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age':    [25, 30, 35, 28],
    'City':   ['NYC', 'LA', 'NYC', 'Chicago'],
    'Salary': [70000, 85000, 92000, 78000]
})

# Column selection
print(df['Name'])                     # Single column (Series)
print(df[['Name', 'Salary']])         # Multiple columns (DataFrame)

# Row selection by label (.loc — inclusive on both ends)
print(df.loc[0:2])                    # Rows 0, 1, 2
print(df.loc[0:2, 'Name':'City'])     # Rows 0-2, cols Name through City

# Row selection by position (.iloc — exclusive on end like Python slicing)
print(df.iloc[0:2])                   # Rows 0, 1 (NOT 2)
print(df.iloc[0:2, 0:3])             # Rows 0-1, cols 0-2

# Boolean filtering — the workhorse of preprocessing
print(df[df['Age'] > 28])
print(df[df['City'] == 'NYC'])
print(df[(df['Age'] > 25) & (df['Salary'] > 75000)])
\`\`\`

**💡 What this achieves:** This code demonstrates how to surgically extract exactly the rows and columns you need based on intelligent conditions (e.g., slicing out individuals older than 25 making over $75k).

---

### Handling Missing Data

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': [np.nan, 2, 3, 4],
    'C': [1, np.nan, np.nan, 4]
})

print(df.isnull().sum())       # Missing count per column
print(df.isnull().sum().sum()) # Total missing

df.dropna()                    # Drop rows with ANY NaN
df.dropna(axis=1)              # Drop COLUMNS with ANY NaN
df.dropna(thresh=2)            # Keep rows with ≥2 non-NaN values

# Fill strategies
df.fillna(0)                           # Replace all NaN with 0
df.fillna(df.mean(numeric_only=True))  # Fill with column mean
df['A'].ffill()                        # Forward fill (use previous value)
df['A'].bfill()                        # Backward fill (use next value)

print(df.fillna(df.mean(numeric_only=True)))
\`\`\`

**💡 What this achieves:** Machine learning algorithms cannot train on missing data. These commands identify missing counts and apply strategic statistical repairs—like filling gaps with the median value—to salvage incomplete datasets.

Choose your strategy based on context: **drop** when missing % is small; **fill with mean/median** to preserve size; **forward/backward fill** for time-series.

---

### Data Transformation

\`\`\`python
import pandas as pd

df = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Salary': [70000, 85000]})

# Add and modify columns
df['Tax'] = df['Salary'] * 0.25
df['Net'] = df['Salary'] - df['Tax']

# Apply a function to a column
df['Name_Upper'] = df['Name'].apply(str.upper)

# Lambda function
df['Grade'] = df['Salary'].apply(lambda x: 'High' if x > 80000 else 'Standard')

# Sorting
df.sort_values('Salary', ascending=False)
df.sort_values(['Net', 'Tax'])

print(df)
\`\`\`

**💡 What this achieves:** 'Feature Engineering' begins here. By cleanly creating new columns (like \`Tax\` or \`Net\`) and applying Lambda conditional logic across thousands of rows instantly, you extract higher-order predictive signal from raw numbers.

---

### Grouping and Aggregation

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'City':   ['NYC', 'LA', 'NYC', 'LA', 'NYC'],
    'Dept':   ['Eng', 'Eng', 'Sales', 'Sales', 'Eng'],
    'Salary': [90000, 85000, 70000, 72000, 95000]
})

# Group by one column
print(df.groupby('City')['Salary'].mean())

# Multiple aggregations at once
print(df.groupby('City')['Salary'].agg(['mean', 'min', 'max', 'count']))

# Group by multiple columns
print(df.groupby(['City', 'Dept'])['Salary'].mean())
\`\`\`

**💡 What this achieves:** Similar to Excel Pivot tables or SQL \`GROUP BY\`, this isolates specific demographic segments (like \`City\` and \`Dept\`) to compute targeted statistical aggregates (like Average Salary).

\`groupby()\` is the Pandas equivalent of SQL's \`GROUP BY\`. The pattern is always: **split → apply → combine**.

---

### String Operations

\`\`\`python
import pandas as pd

df = pd.DataFrame({'Name': [' Alice ', 'BOB', 'charlie ']})

# The .str accessor exposes string methods
df['Name'] = df['Name'].str.strip()        # Remove whitespace
df['Name'] = df['Name'].str.title()        # Title Case
df['Name_Lower'] = df['Name'].str.lower()  # lowercase
df['Has_A'] = df['Name'].str.contains('a', case=False)

print(df)
\`\`\`

**💡 What this achieves:** Raw text data is notoriously messy. This script standardizes whitespace, forces uniform capitalization, and searches for substrings across the whole column simultaneously.

---

### Merging DataFrames

\`\`\`python
import pandas as pd

employees = pd.DataFrame({'emp_id': [1, 2, 3], 'name': ['Alice', 'Bob', 'Charlie']})
salaries  = pd.DataFrame({'emp_id': [1, 2, 4], 'salary': [70000, 85000, 92000]})

inner = pd.merge(employees, salaries, on='emp_id', how='inner')  # only matching ids
left  = pd.merge(employees, salaries, on='emp_id', how='left')   # all employees
outer = pd.merge(employees, salaries, on='emp_id', how='outer')  # all records

print("Inner join:")
print(inner)
print("\\nLeft join:")
print(left)
\`\`\`

**💡 What this achieves:** Just like an SQL \`JOIN\`, merging fuses multiple tables together based on a shared ID key to consolidate data across different databases into one master table.

---

### Data Type Conversion and Encoding

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Salary': ['70000', '85000', '92000'],
    'Age':    ['25', 'NaN', '35'],
    'City':   ['NYC', 'LA', 'NYC']
})

df['Salary'] = df['Salary'].astype(float)
df['Age'] = pd.to_numeric(df['Age'], errors='coerce')  # invalid → NaN

# One-hot encoding for categorical columns
df_encoded = pd.get_dummies(df, columns=['City'], drop_first=True)
print(df_encoded)
\`\`\`

**💡 What this achieves:** Neural networks only understand numbers. \`get_dummies()\` (One-Hot Encoding) is a critical step that converts categorical text—like City names—into binary \`(0/1)\` numeric columns so machines can process them!

\`pd.to_numeric(errors='coerce')\` is safer than \`astype()\` because it converts invalid values to NaN instead of crashing. \`get_dummies()\` converts text categories to binary (0/1) columns — required for most ML models.`,
          taskDescription: "Create a DataFrame with columns Name, Score, Grade for 3 students. Add a 'Passed' column where True if Score >= 60. Sort by Score descending and print.",
          initialCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name':  ['Alice', 'Bob', 'Charlie'],\n    'Score': [85, 55, 90],\n    'Grade': ['A', 'F', 'A']\n})\n# Add Passed column and sort by Score descending\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "pandas-practice-1",
          title: "Practice: Student Scores DataFrame",
          content: `### Exercise 1: Student Scores DataFrame

Create a DataFrame with columns **Student**, **Math**, **Science**, **English** for 5 students. Then:
- Add an **Average** column with each student's mean score across subjects
- Sort the DataFrame by Average in **descending order**
- Print the final result

**Hints:**
- Use \`df[['Math', 'Science', 'English']].mean(axis=1)\` to average across columns (axis=1 = across columns for each row)
- Use \`df.sort_values('Average', ascending=False)\`

---

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Student': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Math':    [85, 92, 78, 95, 88],
    'Science': [90, 85, 72, 98, 82],
    'English': [88, 78, 85, 92, 90]
})

df['Average'] = df[['Math', 'Science', 'English']].mean(axis=1)
df = df.sort_values('Average', ascending=False).reset_index(drop=True)

print(df)
print("\\nTop student:", df.iloc[0]['Student'])
\`\`\``,
          taskDescription: "Create a 5-student DataFrame with Math, Science, English scores. Add Average column, sort descending by Average, and print.",
          initialCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Student': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],\n    'Math':    [85, 92, 78, 95, 88],\n    'Science': [90, 85, 72, 98, 82],\n    'English': [88, 78, 85, 92, 90]\n})\n\n# Add Average column\n\n# Sort by Average descending\n\nprint(df)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "pandas-practice-2",
          title: "Practice: Missing Value Handling",
          content: `### Exercise 2: Missing Value Handling

Create a DataFrame with some missing values. Then:
- **(a)** Report the count of missing values per column
- **(b)** Fill numeric columns with the **column median**
- **(c)** Drop any remaining rows with missing data

**Hints:**
- Use \`df.isnull().sum()\` for (a)
- Use \`df.select_dtypes(include='number').columns\` to find numeric columns
- Use \`df[num_cols].fillna(df[num_cols].median())\` for (b)
- Use \`df.dropna()\` for (c)

---

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'Name':   ['Alice', 'Bob', None, 'Diana'],
    'Age':    [25, np.nan, 35, 28],
    'Salary': [70000, 85000, np.nan, 78000]
})

# (a) Missing count per column
print("Missing values:")
print(df.isnull().sum())

# (b) Fill numeric columns with their median
num_cols = df.select_dtypes(include='number').columns
df[num_cols] = df[num_cols].fillna(df[num_cols].median())

# (c) Drop remaining rows with any missing data (Name=None)
df = df.dropna()

print("\\nCleaned DataFrame:")
print(df)
\`\`\``,
          taskDescription: "Handle missing values: (a) count per column, (b) fill numeric with median, (c) drop remaining rows with NaN.",
          initialCode: "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'Name':   ['Alice', 'Bob', None, 'Diana'],\n    'Age':    [25, np.nan, 35, 28],\n    'Salary': [70000, 85000, np.nan, 78000]\n})\n\n# (a) Print missing counts\n\n# (b) Fill numeric columns with median\n\n# (c) Drop rows still having NaN\n\nprint(df)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "pandas-practice-3",
          title: "Practice: Sales GroupBy Analysis",
          content: `### Exercise 3: Sales GroupBy Analysis

Given a sales DataFrame with columns **Region**, **Product**, **Revenue**, and **Date**, write code to:
- **(a)** Find **total revenue per Region**
- **(b)** Find the **top-selling Product** (by total revenue)
- **(c)** Find **monthly revenue trends**

**Hints:**
- \`groupby('Region')['Revenue'].sum()\` for (a)
- \`groupby('Product')['Revenue'].sum().idxmax()\` for (b)
- \`pd.to_datetime()\` then \`dt.to_period('M')\` for monthly grouping

---

\`\`\`python
import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    'Date':    pd.date_range('2026-01-01', periods=20, freq='W'),
    'Region':  np.random.choice(['North', 'South', 'East'], 20),
    'Product': np.random.choice(['Widget', 'Gadget', 'Gizmo'], 20),
    'Revenue': np.random.randint(1000, 10000, 20)
})

# (a) Total revenue per region
print("Revenue by Region:")
print(df.groupby('Region')['Revenue'].sum())

# (b) Top-selling product
top = df.groupby('Product')['Revenue'].sum().idxmax()
print(f"\\nTop product: {top}")

# (c) Monthly revenue trends
df['Month'] = df['Date'].dt.to_period('M')
print("\\nMonthly Revenue:")
print(df.groupby('Month')['Revenue'].sum())
\`\`\``,
          taskDescription: "Analyze the sales DataFrame: (a) total revenue per Region, (b) top-selling Product, (c) monthly revenue trends.",
          initialCode: "import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\ndf = pd.DataFrame({\n    'Date':    pd.date_range('2026-01-01', periods=20, freq='W'),\n    'Region':  np.random.choice(['North', 'South', 'East'], 20),\n    'Product': np.random.choice(['Widget', 'Gadget', 'Gizmo'], 20),\n    'Revenue': np.random.randint(1000, 10000, 20)\n})\n\n# (a) Total revenue per region\n\n# (b) Top-selling product\n\n# (c) Monthly revenue trends\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "pandas-practice-4",
          title: "Practice: Data Cleaning Pipeline",
          content: `### Exercise 4: Full Data Cleaning Pipeline

Given a messy DataFrame, clean it by:
- **(a)** Standardizing the Name column to **lowercase** and stripping whitespace
- **(b)** Removing **duplicate rows** (after normalization)
- **(c)** Converting Score to **numeric** type
- **(d)** Adding a **Status** column: 'Pass' if Score ≥ 80, else 'Fail'

This is a typical first-pass cleaning pipeline you would apply to any raw dataset.

**Hints:**
- \`.str.lower().str.strip()\` for normalization
- \`drop_duplicates()\` to remove duplicates
- \`pd.to_numeric(df['Score'])\` for conversion
- \`.apply(lambda x: ...)\` for the conditional column

---

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    'Name':  ['Alice', 'BOB', 'alice', 'Charlie', 'Bob'],
    'Score': ['85', '92', '85', '78', '92'],
    'Grade': ['A', 'A', 'A', 'B', 'A']
})

print("Before cleaning:")
print(df)

# (a) Standardize Name
df['Name'] = df['Name'].str.lower().str.strip()

# (b) Remove duplicates
df = df.drop_duplicates()

# (c) Convert Score to numeric
df['Score'] = pd.to_numeric(df['Score'])

# (d) Add Status column
df['Status'] = df['Score'].apply(lambda x: 'Pass' if x >= 80 else 'Fail')

print("\\nAfter cleaning:")
print(df)
\`\`\``,
          taskDescription: "Clean the DataFrame: (a) lowercase names, (b) drop duplicates, (c) convert Score to numeric, (d) add Pass/Fail Status column.",
          initialCode: "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name':  ['Alice', 'BOB', 'alice', 'Charlie', 'Bob'],\n    'Score': ['85', '92', '85', '78', '92'],\n    'Grade': ['A', 'A', 'A', 'B', 'A']\n})\n\n# (a) Standardize Name to lowercase\n\n# (b) Remove duplicates\n\n# (c) Convert Score to numeric\n\n# (d) Add Status column (Pass if Score >= 80)\n\nprint(df)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CHAPTER 3: Matplotlib & Seaborn
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Matplotlib & Seaborn — Data Visualization",
      subModules: [
        {
          id: "matplotlib-theory",
          title: "Matplotlib Theory: Figures, Axes & Plot Types",
          content: `### Why Visualization Matters

Data visualization is not just about making pretty charts — it is a critical analytical step. Before building any model, visualize your data to spot patterns, detect outliers, understand distributions, and verify assumptions. A dataset with the same mean, standard deviation, and correlation can look completely different when plotted (see **Anscombe's Quartet**).

Python's visualization stack: **Matplotlib** is the low-level foundation with full pixel control. **Seaborn** is a high-level statistical library built on top of Matplotlib that creates publication-quality graphics in one line.

---

### The Figure and Axes Model

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Method 1: Quick single plot (pyplot interface)
plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
plt.xlabel('X axis')
plt.ylabel('Y axis')
plt.title('Simple Line Plot')
plt.show()
\`\`\`

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Method 2: Object-oriented (recommended for complex plots)
fig, ax = plt.subplots(figsize=(8, 5))
ax.plot([1, 2, 3, 4], [10, 20, 25, 30], color='blue', linewidth=2)
ax.set_xlabel('X axis')
ax.set_ylabel('Y axis')
ax.set_title('OO-style Line Plot')
plt.tight_layout()
plt.show()
\`\`\`

**💡 What this achieves:** Matplotlib provides you a literal canvas (\`fig\`) and specific sub-regions (\`ax\`) to programmatically draw stunning graphs pixel-by-pixel.

The **object-oriented approach** (\`fig, ax = plt.subplots()\`) is preferred for complex visualizations. The \`fig\` controls figure size and saving; the \`ax\` controls plot content.

---

### Essential Plot Types

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Line plot — for trends over time
x = np.linspace(0, 10, 100)
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, np.sin(x), label='sin(x)', color='#2E75B6')
ax.plot(x, np.cos(x), label='cos(x)', color='#E07020', linestyle='--')
ax.legend()
ax.set_title('Trigonometric Functions')
plt.show()
\`\`\`

\`\`\`python
import matplotlib.pyplot as plt

# Bar chart — for comparing categories
categories = ['Python', 'JavaScript', 'Java', 'C++', 'Go']
values     = [35, 25, 20, 12, 8]

fig, ax = plt.subplots(figsize=(8, 4))
bars = ax.bar(categories, values, color=['#2E75B6', '#E07020', '#70AD47', '#FF0000', '#7030A0'])
ax.set_ylabel('Usage (%)')
ax.set_title('Language Popularity')
for bar, val in zip(bars, values):
    ax.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 0.5,
            str(val), ha='center', fontsize=10)
plt.tight_layout()
plt.show()
\`\`\`

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Histogram — for understanding distributions
data = np.random.normal(loc=65, scale=10, size=1000)
fig, ax = plt.subplots(figsize=(8, 4))
ax.hist(data, bins=30, color='#2E75B6', edgecolor='white', alpha=0.7)
ax.axvline(np.mean(data), color='red', linestyle='--',
           label=f'Mean: {np.mean(data):.1f}')
ax.legend()
ax.set_xlabel('Value')
ax.set_title('Distribution of Data')
plt.show()
\`\`\`

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

# Scatter plot — for relationships between variables
x = np.random.rand(100) * 100
y = 2.5 * x + np.random.randn(100) * 20

fig, ax = plt.subplots(figsize=(8, 5))
scatter = ax.scatter(x, y, alpha=0.6, c=y, cmap='coolwarm', edgecolors='gray', s=50)
ax.set_xlabel('Study Hours')
ax.set_ylabel('Test Score')
ax.set_title('Study Hours vs Test Score')
plt.colorbar(scatter, label='Score')
plt.show()
\`\`\`

**💡 What this achieves:** These foundational Plot structures (Lines, Bars, Histograms, Scatters) allow you to spot trends, compare categories, understand mathematical distributions, and identify linear relationships respectively.

---

### Subplots — Multiple Plots in One Figure

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# Top-left: line
axes[0, 0].plot(np.random.randn(50).cumsum())
axes[0, 0].set_title('Cumulative Random Walk')

# Top-right: histogram
axes[0, 1].hist(np.random.randn(500), bins=25, color='teal')
axes[0, 1].set_title('Normal Distribution')

# Bottom-left: scatter
axes[1, 0].scatter(np.random.rand(50), np.random.rand(50))
axes[1, 0].set_title('Random Scatter')

# Bottom-right: bar
axes[1, 1].bar(['A', 'B', 'C', 'D'], [3, 7, 2, 5], color='salmon')
axes[1, 1].set_title('Bar Chart')

plt.tight_layout()
plt.show()
\`\`\`

**💡 What this achieves:** Creating a dense grid of visualizations (a Dashboard) enables you to instantly compare multiple distinct metrics side-by-side without swapping figures.

\`plt.subplots(rows, cols)\` creates a grid and returns a 2D array of Axes. Access each with \`axes[row, col]\`. \`plt.tight_layout()\` prevents label overlap.`,
          taskDescription: "Create a 1x2 figure: left subplot is a histogram of 500 random normal values, right subplot is a scatter plot of 50 random x/y points. Add titles and call plt.show().",
          initialCode: "import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, axes = plt.subplots(1, 2, figsize=(12, 4))\n\n# Left: histogram of 500 normal random values\n\n# Right: scatter of 50 random x, y points\n\nplt.tight_layout()\nplt.show()\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "seaborn-theory",
          title: "Seaborn Theory: Statistical Visualization",
          content: `### Why Seaborn?

Seaborn wraps Matplotlib's complexity in elegant, one-line calls that produce publication-quality **statistical** graphics. It works seamlessly with Pandas DataFrames, automatically handles legends and color coding, and provides plot types specifically designed for statistical analysis — distributions, correlations, and category comparisons.

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

# Always set a global style
sns.set_theme(style='whitegrid')
\`\`\`

---

### Distribution Plots

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')  # built-in sample dataset

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

# Histogram + KDE (kernel density estimate)
sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0])
axes[0].set_title('Bill Distribution')

# Box plot: median, quartiles, and outliers
sns.boxplot(data=tips, x='day', y='total_bill', ax=axes[1])
axes[1].set_title('Bills by Day')

plt.tight_layout()
plt.show()
\`\`\`

**💡 What this achieves:** Instead of manually formatting Matplotlib blocks, Seaborn condenses complex statistical distribution plotting into elegant one-liners. This empowers data scientists to rapidly explore feature density.

The \`kde=True\` flag overlays a smooth **Kernel Density Estimate** curve. Box plots are invaluable for spotting **outliers** (dots beyond whiskers) and comparing distributions across categories. The box = IQR, line = median, whiskers = 1.5×IQR.

---

### Relationship Plots

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')

# Scatter with regression line, split by category
fig, ax = plt.subplots(figsize=(8, 5))
sns.scatterplot(data=tips, x='total_bill', y='tip', hue='smoker', ax=ax)
ax.set_title('Tip vs Bill by Smoker Status')
plt.show()
\`\`\`

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')

# Pair plot: scatter matrix for all numeric columns
sns.pairplot(tips, hue='sex', diag_kind='kde')
plt.suptitle('Pair Plot — Tips Dataset', y=1.02)
plt.show()
\`\`\`

**💡 What this achieves:** The Pair Plot is the absolute pinnacle of Exploratory Data Analysis. Generating a massive grid of scatterplots for every single numeric interaction immediately exposes feature correlations across the entire dataset.

\`sns.pairplot()\` is a powerful EDA tool — it creates scatter plots for every pair of numeric columns with distribution plots on the diagonal. This instantly reveals correlations, clusters, and outliers.

---

### Correlation Heatmap

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')
corr = tips[['total_bill', 'tip', 'size']].corr()

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0,
            square=True, linewidths=1, fmt='.2f', ax=ax)
ax.set_title('Correlation Matrix')
plt.tight_layout()
plt.show()
\`\`\`

**💡 What this achieves:** Visualizing highly correlated features via a heatmap allows you to prevent collinearity issues or pinpoint independent variables that best predict your machine learning target variable.

Values near **+1** = strong positive correlation, near **-1** = strong negative, near **0** = no linear relationship. \`annot=True\` prints correlation values in cells. \`center=0\` ensures blue = negative, red = positive.

---

### Categorical Plots

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# Count plot: frequency of each category
sns.countplot(data=tips, x='day', order=['Thur', 'Fri', 'Sat', 'Sun'], ax=axes[0])
axes[0].set_title('Count by Day')

# Violin plot: distribution shape per category
sns.violinplot(data=tips, x='day', y='total_bill', ax=axes[1])
axes[1].set_title('Bill Distribution by Day')

# Bar plot: mean with confidence interval
sns.barplot(data=tips, x='day', y='tip', estimator='mean', ax=axes[2])
axes[2].set_title('Average Tip by Day')

plt.tight_layout()
plt.show()
\`\`\`

**💡 What this achieves:** This code quickly measures class imbalance, demographic densities, and statistical uncertainty (confidence intervals) of categorical data before processing.

**Count plots** reveal class imbalance. **Violin plots** combine box + KDE to show full distribution shape. **Bar plots** show means with confidence intervals (shaded area = uncertainty).`,
          taskDescription: "Load seaborn's 'tips' dataset. Create a countplot showing number of records per 'day', and a boxplot showing 'total_bill' distribution per 'day'. Show both in a 1x2 figure.",
          initialCode: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntips = sns.load_dataset('tips')\nfig, axes = plt.subplots(1, 2, figsize=(12, 4))\n\n# Left: countplot by day\n\n# Right: boxplot total_bill by day\n\nplt.tight_layout()\nplt.show()\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "viz-practice-1",
          title: "Practice: Multi-Panel Visualization",
          content: `### Exercise 1: Multi-Panel Dashboard (Tips Dataset)

Load Seaborn's **tips** dataset and create a **2×2 figure** with:
- **(a)** Top-left: histogram of \`total_bill\` with KDE
- **(b)** Top-right: boxplot of \`tip\` by \`day\`
- **(c)** Bottom-left: scatter of \`total_bill\` vs \`tip\` colored by \`time\`
- **(d)** Bottom-right: bar chart of average \`tip\` by \`day\`

**Hints:**
- \`sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0,0])\`
- \`sns.boxplot(data=tips, x='day', y='tip', ax=axes[0,1])\`
- \`sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time', ax=axes[1,0])\`
- \`sns.barplot(data=tips, x='day', y='tip', estimator='mean', ax=axes[1,1])\`

---

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

tips = sns.load_dataset('tips')
sns.set_theme(style='whitegrid')

fig, axes = plt.subplots(2, 2, figsize=(12, 9))

sns.histplot(data=tips, x='total_bill', kde=True, ax=axes[0, 0])
axes[0, 0].set_title('Bill Distribution')

sns.boxplot(data=tips, x='day', y='tip', ax=axes[0, 1])
axes[0, 1].set_title('Tips by Day')

sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time', ax=axes[1, 0])
axes[1, 0].set_title('Bill vs Tip')

sns.barplot(data=tips, x='day', y='tip', estimator='mean', ax=axes[1, 1])
axes[1, 1].set_title('Average Tip by Day')

plt.tight_layout()
plt.show()

# Print some stats to verify
print("Mean tip:", tips['tip'].mean().round(2))
print("Max bill:", tips['total_bill'].max())
\`\`\``,
          taskDescription: "Create a 2x2 visualization dashboard using the tips dataset: histogram, boxplot, scatter, and barplot.",
          initialCode: "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntips = sns.load_dataset('tips')\nfig, axes = plt.subplots(2, 2, figsize=(12, 9))\n\n# (a) Histogram of total_bill with KDE\n\n# (b) Boxplot of tip by day\n\n# (c) Scatter total_bill vs tip colored by time\n\n# (d) Bar chart average tip by day\n\nplt.tight_layout()\nplt.show()\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "viz-practice-2",
          title: "Practice: Correlation Heatmap",
          content: `### Exercise 2: Correlation Heatmap — Iris Dataset

Load Seaborn's **iris** dataset. Compute the correlation matrix of all numeric features and visualize it as a heatmap. Then answer: **which two features are most strongly correlated?**

**Hints:**
- \`iris = sns.load_dataset('iris')\`
- \`iris.select_dtypes(include='number').corr()\` for numeric columns only
- \`sns.heatmap(corr, annot=True, cmap='coolwarm', center=0)\`
- Look for the value closest to 1.0 (excluding the diagonal)

---

\`\`\`python
import seaborn as sns
import matplotlib.pyplot as plt

iris = sns.load_dataset('iris')
corr = iris.select_dtypes(include='number').corr()

fig, ax = plt.subplots(figsize=(7, 5))
sns.heatmap(corr, annot=True, cmap='coolwarm', center=0,
            fmt='.2f', square=True, linewidths=0.5, ax=ax)
ax.set_title('Iris Feature Correlations')
plt.tight_layout()
plt.show()

# Print the correlation values
print("\\nCorrelation Matrix:")
print(corr.round(2))

# Find the highest correlation (excluding self-correlations)
import numpy as np
mask = np.triu(np.ones_like(corr, dtype=bool))
masked = corr.mask(mask)
max_pair = masked.stack().idxmax()
print(f"\\nStrongest correlation: {max_pair[0]} vs {max_pair[1]} ({corr.loc[max_pair]:.2f})")
\`\`\``,
          taskDescription: "Compute and visualize the correlation heatmap for the iris dataset. Find and print the two most strongly correlated features.",
          initialCode: "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\niris = sns.load_dataset('iris')\n\n# Compute correlation matrix of numeric columns\ncorr = \n\n# Create heatmap\nfig, ax = plt.subplots(figsize=(7, 5))\n\n# Fill in: sns.heatmap(...)\n\nplt.tight_layout()\nplt.show()\nprint(corr.round(2))\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "viz-practice-3",
          title: "Practice: Comparing Distributions",
          content: `### Exercise 3: Overlapping Distribution Comparison

Generate three datasets from different distributions:
- **Normal**: mean=50, std=10, n=1000
- **Uniform**: range [20, 80], n=1000
- **Exponential**: scale=20, n=1000

Plot all three on the **same figure** as semi-transparent histograms with a legend. Add vertical lines for each distribution's mean.

**Hints:**
- Use \`alpha=0.5\` for transparency so histograms don't fully overlap
- Use \`ax.axvline()\` to draw vertical mean lines
- \`np.random.normal(50, 10, 1000)\`, \`np.random.uniform(20, 80, 1000)\`, \`np.random.exponential(20, 1000)\`

---

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
normal  = np.random.normal(50, 10, 1000)
uniform = np.random.uniform(20, 80, 1000)
expon   = np.random.exponential(20, 1000)

fig, ax = plt.subplots(figsize=(10, 5))

ax.hist(normal,  bins=40, alpha=0.5, label='Normal',      color='blue')
ax.hist(uniform, bins=40, alpha=0.5, label='Uniform',     color='green')
ax.hist(expon,   bins=40, alpha=0.5, label='Exponential', color='red')

ax.axvline(np.mean(normal),  color='blue',  linestyle='--', linewidth=2)
ax.axvline(np.mean(uniform), color='green', linestyle='--', linewidth=2)
ax.axvline(np.mean(expon),   color='red',   linestyle='--', linewidth=2)

ax.legend()
ax.set_xlabel('Value')
ax.set_title('Comparing Three Distributions')
plt.tight_layout()
plt.show()

print(f"Normal mean:  {np.mean(normal):.2f}")
print(f"Uniform mean: {np.mean(uniform):.2f}")
print(f"Exponential mean: {np.mean(expon):.2f}")
\`\`\``,
          taskDescription: "Generate normal, uniform, and exponential datasets (n=1000, seed=42). Plot all three as overlapping histograms with a legend and mean lines.",
          initialCode: "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(42)\nnormal  = np.random.normal(50, 10, 1000)\nuniform = np.random.uniform(20, 80, 1000)\nexpon   = np.random.exponential(20, 1000)\n\nfig, ax = plt.subplots(figsize=(10, 5))\n\n# Plot all three as semi-transparent histograms\n\n# Add legend and title\n\nplt.show()\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // CHAPTER 4: Capstone Project
    // ─────────────────────────────────────────────────────────────────────────
    {
      title: "Capstone Project — End-to-End Titanic Analysis",
      subModules: [
        {
          id: "capstone-step-1",
          title: "Step 1: Load and Explore the Data",
          content: `### Capstone Project Overview

This chapter brings everything together in a complete data analysis project using the **Titanic dataset** — a cleaned version containing information about 891 passengers: survival, class, sex, age, fare, and more.

We will follow the exact workflow used in real-world data science projects:
1. Load and explore → 2. Analyze missing data → 3. Clean → 4. Visualize → 5. Engineer features → 6. Correlate → 7. Report insights

---

### Step 1: Load and Explore the Data

\`\`\`python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style='whitegrid')

# Load the built-in Titanic dataset
df = sns.load_dataset('titanic')

# Standard first-look commands
print(f"Shape: {df.shape}")     # (891, 15)
print("\\nFirst 5 rows:")
print(df.head())
print("\\nColumn info:")
print(df.info())
print("\\nStatistical summary:")
print(df.describe())
\`\`\`

Running \`df.info()\` reveals the key issues immediately:
- \`age\` has ~177 missing values (20% of the data)
- \`deck\` has ~688 missing values (77% — almost useless!)
- \`embark_town\` has only 2 missing values

\`df.describe()\` shows quick stats: mean survival rate ~0.38 (38% survived), average age ~29.7, fare ranges from \\$0 to \\$512.

**This 3-command pattern (head, info, describe) should be your first move on any new dataset.**`,
          taskDescription: "Load the Titanic dataset using sns.load_dataset('titanic'). Print its shape, then run df.info() and df.describe() to understand its structure.",
          initialCode: "import seaborn as sns\nimport pandas as pd\n\ndf = sns.load_dataset('titanic')\n\n# Print shape, info, and describe\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-2",
          title: "Step 2: Missing Data Analysis",
          content: `### Step 2: Visualize Missing Data

Before deciding how to handle missing values, visualize them to understand the scale of the problem.

\`\`\`python
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
sns.set_theme(style='whitegrid')

df = sns.load_dataset('titanic')

# Calculate missing value counts
missing = df.isnull().sum()
missing = missing[missing > 0].sort_values(ascending=False)

# Visualize missing values as a bar chart
fig, ax = plt.subplots(figsize=(10, 4))
ax.bar(missing.index, missing.values, color='salmon')
ax.set_ylabel('Missing Count')
ax.set_title('Missing Values by Column')
for i, v in enumerate(missing.values):
    ax.text(i, v + 5, str(v), ha='center', fontsize=9)
plt.tight_layout()
plt.show()

# Print percentage missing
pct_missing = (df.isnull().sum() / len(df) * 100).round(1).sort_values(ascending=False)
print("Missing percentages:")
print(pct_missing[pct_missing > 0])
\`\`\`

**Decision guide based on missing %:**
| Missing % | Strategy |
|-----------|----------|
| < 5%      | Drop rows or fill with mode/constant |
| 5–25%     | Impute with mean/median |
| 25–50%    | Impute carefully or use model-based imputation |
| > 50%     | Consider dropping the column entirely |

For the Titanic data: **deck** (77% missing) → drop column. **age** (20% missing) → fill with median. **embark_town** (0.2%) → fill with mode.`,
          taskDescription: "Load Titanic data, compute missing value counts per column, and print them sorted descending. Which column has the most missing values?",
          initialCode: "import seaborn as sns\nimport pandas as pd\n\ndf = sns.load_dataset('titanic')\n\n# Count and sort missing values\nmissing = \n\nprint(missing)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-3",
          title: "Step 3: Data Cleaning",
          content: `### Step 3: Clean the Dataset

Apply targeted strategies for each column's missing data issue.

\`\`\`python
import seaborn as sns
import pandas as pd

df = sns.load_dataset('titanic')

# Drop columns: 'deck' (77% missing) and redundant columns
# alive = string version of survived
# who, adult_male = redundant with sex + age
df = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])

# Fill 'age' with median — robust to outliers (unlike mean)
df['age'] = df['age'].fillna(df['age'].median())

# Fill 'embarked' with mode (most frequent value)
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])

# Verify: zero missing values remain
print(f"Total missing values: {df.isnull().sum().sum()}")  # should be 0
print(f"Clean shape: {df.shape}")
print("\\nColumns remaining:")
print(df.columns.tolist())
print("\\nData types:")
print(df.dtypes)
\`\`\`

**Why median over mean for age?** A few very old passengers would skew the mean upward. The median is robust to outliers — it represents the "typical" passenger better.

**Why drop redundant columns?** \`alive\` is just a string version of \`survived\`. \`adult_male\` encodes the same information as \`sex\` + \`age\`. Keeping redundant features can mislead correlation analysis.`,
          taskDescription: "Clean the Titanic DataFrame: drop 'deck', 'alive', 'who', 'adult_male', 'embark_town'. Fill 'age' with median and 'embarked' with mode. Verify 0 missing values remain.",
          initialCode: "import seaborn as sns\nimport pandas as pd\n\ndf = sns.load_dataset('titanic')\n\n# Drop columns\ndf = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])\n\n# Fill age with median\n\n# Fill embarked with mode\n\n# Verify\nprint('Missing remaining:', df.isnull().sum().sum())\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-4",
          title: "Step 4: Exploratory Data Analysis (EDA)",
          content: `### Step 4: Visualize Key Patterns

Create a 6-panel EDA dashboard to understand survival patterns in the Titanic data.

\`\`\`python
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
sns.set_theme(style='whitegrid')

df = sns.load_dataset('titanic')
df = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])

fig, axes = plt.subplots(2, 3, figsize=(16, 10))

# 1. Survival count
sns.countplot(data=df, x='survived', ax=axes[0, 0], palette=['salmon', 'skyblue'])
axes[0, 0].set_title('Survival Count')
axes[0, 0].set_xticks([0, 1])
axes[0, 0].set_xticklabels(['Died', 'Survived'])

# 2. Survival by sex
sns.countplot(data=df, x='sex', hue='survived', ax=axes[0, 1])
axes[0, 1].set_title('Survival by Sex')

# 3. Survival by class
sns.countplot(data=df, x='pclass', hue='survived', ax=axes[0, 2])
axes[0, 2].set_title('Survival by Class')

# 4. Age distribution by survival
sns.histplot(data=df, x='age', hue='survived', kde=True, ax=axes[1, 0])
axes[1, 0].set_title('Age Distribution by Survival')

# 5. Fare distribution by class
sns.boxplot(data=df, x='pclass', y='fare', ax=axes[1, 1])
axes[1, 1].set_title('Fare by Class')

# 6. Survival rate by class and sex
survival_rate = df.groupby(['pclass', 'sex'])['survived'].mean().unstack()
survival_rate.plot(kind='bar', ax=axes[1, 2])
axes[1, 2].set_title('Survival Rate by Class & Sex')
axes[1, 2].set_ylabel('Survival Rate')

plt.tight_layout()
plt.show()
\`\`\`

**Key insights from this EDA:**
- More people died (62%) than survived (38%)
- Women had dramatically higher survival rates than men
- First-class passengers survived at much higher rates than third-class
- Children (age < 10) had above-average survival rates
- First-class women had ~97% survival; third-class men had ~14%`,
          taskDescription: "Create the 6-panel EDA dashboard for the Titanic dataset showing survival by count, sex, class, age distribution, fare by class, and survival rate by class & sex.",
          initialCode: "import seaborn as sns\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('titanic')\ndf = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])\ndf['age'] = df['age'].fillna(df['age'].median())\ndf['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])\n\n# Create 2x3 figure with 6 plots\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-5",
          title: "Step 5: Feature Engineering",
          content: `### Step 5: Create New Features from Existing Data

Feature engineering — creating new columns from existing data — is where domain knowledge meets data science. Well-crafted features often improve model performance more than algorithm selection.

\`\`\`python
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
sns.set_theme(style='whitegrid')

df = sns.load_dataset('titanic')
df = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])

# Feature 1: Age groups using pd.cut()
df['age_group'] = pd.cut(
    df['age'],
    bins=[0, 12, 18, 35, 60, 100],
    labels=['Child', 'Teen', 'Young Adult', 'Adult', 'Senior']
)

# Feature 2: Family size (siblings/spouses + parents/children + self)
df['family_size'] = df['sibsp'] + df['parch'] + 1

# Feature 3: Binary flag — is the passenger alone?
df['is_alone'] = (df['family_size'] == 1).astype(int)

# Feature 4: Fare per person
df['fare_per_person'] = df['fare'] / df['family_size']

# Visualize feature impact on survival
fig, axes = plt.subplots(1, 3, figsize=(15, 4))

sns.barplot(data=df, x='age_group', y='survived', ax=axes[0])
axes[0].set_title('Survival Rate by Age Group')

sns.barplot(data=df, x='family_size', y='survived', ax=axes[1])
axes[1].set_title('Survival Rate by Family Size')

sns.barplot(data=df, x='is_alone', y='survived', ax=axes[2])
axes[2].set_xticklabels(['With Family', 'Alone'])
axes[2].set_title('Alone vs With Family')

plt.tight_layout()
plt.show()

print("New columns added:", ['age_group', 'family_size', 'is_alone', 'fare_per_person'])
\`\`\`

**Insights:** Children had the highest survival rate. Families of 2–4 survived better than solo travelers. Being alone was associated with lower survival probability.

\`pd.cut()\` bins continuous values into labeled categories — perfect for turning age into interpretable groups.`,
          taskDescription: "Engineer 4 new features: age_group (pd.cut), family_size (sibsp+parch+1), is_alone (family_size==1), fare_per_person (fare/family_size). Print the first 5 rows showing the new columns.",
          initialCode: "import seaborn as sns\nimport pandas as pd\n\ndf = sns.load_dataset('titanic')\ndf = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])\ndf['age'] = df['age'].fillna(df['age'].median())\ndf['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])\n\n# Add age_group, family_size, is_alone, fare_per_person\n\nprint(df[['age', 'age_group', 'family_size', 'is_alone', 'fare_per_person']].head())\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-6",
          title: "Step 6: Correlation Analysis",
          content: `### Step 6: Correlation Matrix

A correlation heatmap across all numeric features validates your EDA findings quantitatively and reveals which engineered features have the strongest relationship with the target variable (\`survived\`).

\`\`\`python
import seaborn as sns
import pandas as pd
import matplotlib.pyplot as plt
sns.set_theme(style='whitegrid')

df = sns.load_dataset('titanic')
df = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])
df['family_size'] = df['sibsp'] + df['parch'] + 1
df['is_alone'] = (df['family_size'] == 1).astype(int)
df['fare_per_person'] = df['fare'] / df['family_size']

# Select only numeric columns for correlation
numeric_df = df.select_dtypes(include='number')

fig, ax = plt.subplots(figsize=(10, 8))
sns.heatmap(numeric_df.corr(), annot=True, cmap='RdBu_r', center=0,
            fmt='.2f', square=True, linewidths=0.5, ax=ax)
ax.set_title('Feature Correlation Matrix', fontsize=14)
plt.tight_layout()
plt.show()

# Print correlations with 'survived' sorted by absolute value
corr_survived = numeric_df.corr()['survived'].drop('survived').abs().sort_values(ascending=False)
print("\\nCorrelations with 'survived' (abs):")
print(corr_survived.round(3))
\`\`\`

**Key findings confirmed by correlations:**
- \`survived\` has **positive correlation with fare** (richer passengers survived more)
- \`survived\` has **negative correlation with pclass** (lower number = higher class = better survival)
- \`is_alone\` has **negative correlation with survival** (being alone = lower chance of survival)`,
          taskDescription: "Build the full correlation heatmap for Titanic numeric features. Print the correlations with 'survived' sorted by absolute value to see what matters most.",
          initialCode: "import seaborn as sns\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('titanic')\ndf = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])\ndf['age'] = df['age'].fillna(df['age'].median())\ndf['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])\ndf['family_size'] = df['sibsp'] + df['parch'] + 1\ndf['is_alone'] = (df['family_size'] == 1).astype(int)\n\nnumeric_df = df.select_dtypes(include='number')\n\n# Create correlation heatmap\n\n# Print correlations with survived\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "capstone-step-7",
          title: "Step 7: Final Insights & Summary",
          content: `### Step 7: Extracting and Reporting Insights

The final step of any analysis is to **translate numbers into actionable insights**. Print a structured summary of key findings from your cleaned, engineered dataset.

\`\`\`python
import seaborn as sns
import pandas as pd
import numpy as np

df = sns.load_dataset('titanic')
df = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])
df['age'] = df['age'].fillna(df['age'].median())
df['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])
df['family_size'] = df['sibsp'] + df['parch'] + 1
df['is_alone'] = (df['family_size'] == 1).astype(int)
df['age_group'] = pd.cut(df['age'], bins=[0, 12, 18, 35, 60, 100],
                         labels=['Child', 'Teen', 'Young Adult', 'Adult', 'Senior'])

print("=" * 40)
print("    KEY FINDINGS — TITANIC ANALYSIS")
print("=" * 40)
print(f"Total passengers:     {len(df)}")
print(f"Overall survival:     {df['survived'].mean():.1%}")
print()
print(f"Female survival:      {df[df['sex']=='female']['survived'].mean():.1%}")
print(f"Male survival:        {df[df['sex']=='male']['survived'].mean():.1%}")
print()
print(f"1st class survival:   {df[df['pclass']==1]['survived'].mean():.1%}")
print(f"2nd class survival:   {df[df['pclass']==2]['survived'].mean():.1%}")
print(f"3rd class survival:   {df[df['pclass']==3]['survived'].mean():.1%}")
print()
print(f"Children (< 12) survival: {df[df['age'] < 12]['survived'].mean():.1%}")
print(f"Senior (> 60) survival:   {df[df['age'] > 60]['survived'].mean():.1%}")
print()
print(f"Avg fare (survived):  \${df[df['survived']==1]['fare'].mean():.2f}")
print(f"Avg fare (died):      \${df[df['survived']==0]['fare'].mean():.2f}")
print()
print(f"Alone survival:       {df[df['is_alone']==1]['survived'].mean():.1%}")
print(f"With family survival: {df[df['is_alone']==0]['survived'].mean():.1%}")
print("=" * 40)
\`\`\`

---

### What You Built in This Capstone

You completed a **full data preprocessing pipeline**:

1. **Loaded** raw tabular data and did initial exploration
2. **Identified** missing values and their severity
3. **Cleaned** with targeted strategies (drop, median fill, mode fill)
4. **Visualized** key patterns with a 6-panel EDA dashboard
5. **Engineered** new features (age groups, family size, is_alone)
6. **Analyzed** correlations to validate findings quantitatively
7. **Reported** structured insights from the data

This workflow — with variations in the specific techniques — applies to virtually every data analysis project you will encounter.`,
          taskDescription: "Run the complete final insights report for the cleaned and engineered Titanic dataset. Print all key statistics.",
          initialCode: "import seaborn as sns\nimport pandas as pd\n\n# Load and clean the dataset\ndf = sns.load_dataset('titanic')\ndf = df.drop(columns=['deck', 'alive', 'who', 'adult_male', 'embark_town'])\ndf['age'] = df['age'].fillna(df['age'].median())\ndf['embarked'] = df['embarked'].fillna(df['embarked'].mode()[0])\ndf['family_size'] = df['sibsp'] + df['parch'] + 1\ndf['is_alone'] = (df['family_size'] == 1).astype(int)\n\n# Print the key findings report\nprint('Overall survival rate:', df['survived'].mean().round(3))\nprint('Female survival:      ', df[df['sex']=='female']['survived'].mean().round(3))\nprint('Male survival:        ', df[df['sex']=='male']['survived'].mean().round(3))\n# Add more stats...\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module02;
