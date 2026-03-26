import type { ModuleData } from '../types';

const module02: ModuleData = {
  title: "Data Preprocessing",
  moduleNumber: 2,
  chapters: [
    {
      title: "Data Cleaning & Transformation",
      subModules: [
        {
          id: "dp_01",
          title: "Handling Missing Values",
          content: "Real-world datasets are messy. Missing values (NaN, None) can break your entire pipeline. We explore imputation strategies—mean, median, mode, and KNN-based approaches—and when to drop vs fill.",
          taskDescription: "Create a list 'data' with values [1, None, 3, None, 5]. Replace None with the mean of non-None values and print the result.",
          initialCode: "# Task: Replace None with mean of existing values\ndata = [1, None, 3, None, 5]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dp_02",
          title: "Feature Scaling & Normalization",
          content: "Neural networks converge faster when input features are on the same scale. We compare Min-Max scaling, Z-score standardization, and Robust scaling for outlier-heavy data.",
          taskDescription: "Given data = [10, 20, 30, 40, 50], apply min-max normalization and print the result.",
          initialCode: "# Task: Min-Max normalize the data to [0, 1]\ndata = [10, 20, 30, 40, 50]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dp_03",
          title: "Encoding Categorical Variables",
          content: "ML models only understand numbers. Converting categories like 'red', 'blue', 'green' into numerical representations requires One-Hot Encoding, Label Encoding, or Target Encoding depending on cardinality.",
          taskDescription: "Create a dictionary mapping colors = {'red': 0, 'blue': 1, 'green': 2} and print the encoding for 'blue'.",
          initialCode: "# Task: Create label encoding for colors\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "Data Pipeline Architecture",
      subModules: [
        {
          id: "dp_04",
          title: "ETL Pipeline Design",
          content: "Extract-Transform-Load (ETL) is the backbone of production ML. We build modular pipelines that separate concerns and allow each step to be tested independently.",
          taskDescription: "Write a function 'transform' that takes a list of strings and returns them in uppercase. Print the result for ['hello', 'world'].",
          initialCode: "# Task: Build a transform function\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dp_05",
          title: "Data Validation & Quality Checks",
          content: "Before feeding data to a model, we must validate schema, check distributions, and detect drift. Implementing assertions and statistical tests ensures pipeline reliability.",
          taskDescription: "Write a function 'validate' that checks if all items in a list are positive numbers. Test with [1, 2, 3] and [-1, 2, 3].",
          initialCode: "# Task: Validate that all numbers are positive\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module02;
