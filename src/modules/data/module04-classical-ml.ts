import type { ModuleData } from '../types';

const module04: ModuleData = {
  title: "Classical ML",
  moduleNumber: 4,
  chapters: [
    {
      title: "Supervised Learning Algorithms",
      subModules: [
        {
          id: "cm_01",
          title: "Linear Regression from Scratch",
          content: "Linear regression is the foundation of predictive modeling. We implement it from scratch using the normal equation and gradient descent, understanding the bias-variance tradeoff.",
          taskDescription: "Given X = [1,2,3,4,5] and y = [2,4,6,8,10], compute the slope (m) using the formula m = sum((xi-x_mean)*(yi-y_mean)) / sum((xi-x_mean)^2). Print m.",
          initialCode: "# Task: Compute slope of best fit line\nX = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "cm_02",
          title: "Decision Trees & Information Gain",
          content: "Decision trees split data on features that maximize information gain (minimize entropy). Understanding Gini impurity vs entropy helps you choose the right criterion.",
          taskDescription: "Compute the entropy of a binary distribution with p=0.5 using the formula H = -p*log2(p) - (1-p)*log2(1-p). Print the result.",
          initialCode: "import math\n# Task: Compute binary entropy at p=0.5\np = 0.5\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "cm_03",
          title: "Support Vector Machines",
          content: "SVMs find the maximum-margin hyperplane that separates classes. The kernel trick allows them to handle non-linearly separable data by mapping to higher dimensions.",
          taskDescription: "Compute the Euclidean distance between points a=(1,2) and b=(4,6) and print the result.",
          initialCode: "import math\n# Task: Euclidean distance between two points\na = (1, 2)\nb = (4, 6)\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "Model Evaluation & Selection",
      subModules: [
        {
          id: "cm_04",
          title: "Cross-Validation Strategies",
          content: "K-Fold, Stratified, and Leave-One-Out cross-validation help us estimate model performance on unseen data. Choosing the right strategy depends on dataset size and class balance.",
          taskDescription: "Split a list of 10 items into 5 folds (sublists of 2 each) and print all folds.",
          initialCode: "# Task: Create 5-fold splits\ndata = list(range(10))\nk = 5\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "cm_05",
          title: "Precision, Recall & F1 Score",
          content: "Accuracy alone can be misleading on imbalanced datasets. Precision answers 'of predicted positives, how many are correct?' while Recall answers 'of actual positives, how many did we find?'",
          taskDescription: "Given TP=80, FP=20, FN=10, compute Precision, Recall, and F1. Print all three.",
          initialCode: "# Task: Compute classification metrics\nTP = 80\nFP = 20\nFN = 10\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module04;
