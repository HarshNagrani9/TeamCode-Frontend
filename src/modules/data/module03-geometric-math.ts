import type { ModuleData } from '../types';

const module03: ModuleData = {
  title: "Geometric Math",
  moduleNumber: 3,
  chapters: [
    {
      title: "Linear Algebra for ML",
      subModules: [
        {
          id: "gm_01",
          title: "Vectors & Dot Products",
          content: "Vectors are the language of ML. Every data point, weight, and gradient is a vector. The dot product measures similarity and drives attention mechanisms in transformers.",
          taskDescription: "Compute the dot product of a = [1, 2, 3] and b = [4, 5, 6] using a loop and print the result.",
          initialCode: "# Task: Compute dot product of a and b\na = [1, 2, 3]\nb = [4, 5, 6]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "gm_02",
          title: "Matrix Multiplication",
          content: "Matrix multiplication is the core operation in neural networks. Every forward pass through a layer is a matrix multiply followed by a non-linearity.",
          taskDescription: "Multiply two 2x2 matrices A = [[1,2],[3,4]] and B = [[5,6],[7,8]] manually and print the result.",
          initialCode: "# Task: Manual 2x2 matrix multiplication\nA = [[1,2],[3,4]]\nB = [[5,6],[7,8]]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "gm_03",
          title: "Eigenvalues & Dimensionality",
          content: "PCA uses eigenvalues to find the directions of maximum variance. Understanding eigendecomposition is crucial for feature reduction and data visualization.",
          taskDescription: "Find the trace (sum of diagonal elements) of matrix M = [[3,0],[0,7]] and print it.",
          initialCode: "# Task: Compute the trace of matrix M\nM = [[3,0],[0,7]]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "Calculus for Optimization",
      subModules: [
        {
          id: "gm_04",
          title: "Gradient Descent Intuition",
          content: "Gradient descent navigates the loss landscape by following the steepest downhill direction. The learning rate controls step size—too large and you overshoot, too small and you stall.",
          taskDescription: "Implement one step of gradient descent: x = x - lr * gradient. Start with x=10, lr=0.1, gradient=2. Print the new x.",
          initialCode: "# Task: One step of gradient descent\nx = 10\nlr = 0.1\ngradient = 2\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "gm_05",
          title: "Chain Rule & Backpropagation",
          content: "The chain rule lets us compute gradients through composed functions. Backpropagation is just the chain rule applied systematically from output to input.",
          taskDescription: "Given f(x) = (2x + 3)^2, compute df/dx at x=1 using the chain rule. Print the result (should be 20).",
          initialCode: "# Task: Apply chain rule to compute derivative\nx = 1\n# f(x) = (2x + 3)^2\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module03;
