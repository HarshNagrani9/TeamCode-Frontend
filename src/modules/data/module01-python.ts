import type { ModuleData } from '../types';

const module01: ModuleData = {
  title: "Python for AI",
  moduleNumber: 1,
  chapters: [
    {
      title: "Foundations of Python for ML",
      subModules: [
        {
          id: "ds_01",
          title: "Efficient Data Structures",
          content: "In Machine Learning, we often handle massive datasets. Using standard Python lists can be slow. Here we explore why Tuples are used for tensor shapes (immutability) and how Dictionaries power model configurations.",
          taskDescription: "Create a tuple named 'tensor_shape' with values (3, 224, 224) and print its length.",
          initialCode: "# Task: Create 'tensor_shape' (tuple) with (3, 224, 224)\n# Then print its length.\n",
          testScript: `
import json
try:
    is_tuple = isinstance(tensor_shape, tuple)
    correct_len = len(tensor_shape) == 3
    print("__RESULT__" + json.dumps({"passed": is_tuple and correct_len}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
          `,
          completed: false
        },
        {
          id: "lc_02",
          title: "Advanced List Comprehensions",
          content: "List comprehensions are optimized at the C-level in Python. We use them to transform data labels and normalize small datasets on the fly.",
          taskDescription: "Create a list 'normalized' that squares every number in [1, 2, 3, 4, 5] and print it.",
          initialCode: "# Task: Square numbers 1-5 using a list comprehension.\n# Print the 'normalized' list.\n",
          testScript: `
import json
try:
    is_list = isinstance(normalized, list)
    correct_vals = normalized == [1, 4, 9, 16, 25]
    print("__RESULT__" + json.dumps({"passed": is_list and correct_vals}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
          `,
          completed: false
        },
        {
          id: "mm_03",
          title: "Memory Management & Dynamic Typing",
          content: "Understanding how Python handles object references is key to avoiding memory leaks in long-running training loops.",
          taskDescription: "Create list x = [1]. Create y = x. Append 2 to x and print y to see reference behavior.",
          initialCode: "# Task: Demonstrate object referencing.\n# Create x=[1], y=x, append 2 to x, print y.\n",
          testScript: `
import json
try:
    passed = 'y' in locals() and y == [1, 2] and x is y
    print("__RESULT__" + json.dumps({"passed": passed}))
except NameError:
    print("__RESULT__" + json.dumps({"passed": False}))
          `,
          completed: false
        }
      ]
    },
    {
      title: "Numerical Computing Foundations",
      subModules: [
        {
          id: "vec_01",
          title: "Vectorization over Loops",
          content: "The 'For' loop is the enemy of performance. In this chapter, we discuss the mathematical 'Why' behind vectorization.",
          taskDescription: "Print the string 'Vectorization is faster than loops' to initialize the engine.",
          initialCode: "print('Vectorization is faster than loops')",
          testScript: "import json; print('__RESULT__{\"passed\": true}')",
          completed: false
        },
        {
          id: "brd_02",
          title: "NumPy Array Broadcasting",
          content: "Broadcasting allows you to perform operations on arrays of different shapes.",
          taskDescription: "Define two lists as a, b and print their element-wise sum using a list comprehension to simulate broadcasting.",
          initialCode: "a = [1, 2]\nb = [10, 10]\n# print element-wise sum\n",
          testScript: "import json; print('__RESULT__{\"passed\": True}')",
          completed: false
        },
        {
          id: "slc_03",
          title: "High-Performance Slicing",
          content: "Accessing specific dimensions of a 4D tensor requires precision.",
          taskDescription: "Print a slice of range(10) from index 2 to 5.",
          initialCode: "print(list(range(10))[2:5])",
          testScript: "import json; print('__RESULT__{\"passed\": True}')",
          completed: false
        }
      ]
    }
  ]
};

export default module01;
