import type { ModuleData } from '../types';

const module05: ModuleData = {
  title: "Deep Learning",
  moduleNumber: 5,
  chapters: [
    {
      title: "Neural Network Fundamentals",
      subModules: [
        {
          id: "dl_01",
          title: "Perceptron & Activation Functions",
          content: "A perceptron computes a weighted sum and applies an activation function. We implement ReLU, Sigmoid, and Tanh from scratch and visualize their gradients to understand vanishing gradient problems.",
          taskDescription: "Implement the sigmoid function: sigmoid(x) = 1 / (1 + e^(-x)). Compute sigmoid(0) and print the result.",
          initialCode: "import math\n# Task: Implement sigmoid function\ndef sigmoid(x):\n    pass\n\nprint(sigmoid(0))\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dl_02",
          title: "Forward Pass Implementation",
          content: "The forward pass propagates inputs through layers: z = Wx + b, a = activation(z). Each layer transforms representations, building increasingly abstract features.",
          taskDescription: "Compute the output of a single neuron: z = w1*x1 + w2*x2 + b where w=[0.5, -0.3], x=[1.0, 2.0], b=0.1. Print z.",
          initialCode: "# Task: Single neuron forward pass\nw = [0.5, -0.3]\nx = [1.0, 2.0]\nb = 0.1\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dl_03",
          title: "Loss Functions & Optimization",
          content: "Cross-entropy loss for classification, MSE for regression. We implement both and connect them to gradient computation for weight updates.",
          taskDescription: "Compute MSE between predictions=[2.5, 0.0, 2.1] and targets=[3.0, -0.5, 2.0]. Print the result.",
          initialCode: "# Task: Compute Mean Squared Error\npredictions = [2.5, 0.0, 2.1]\ntargets = [3.0, -0.5, 2.0]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "Advanced Architectures",
      subModules: [
        {
          id: "dl_04",
          title: "Convolutional Neural Networks",
          content: "CNNs exploit spatial locality through learnable filters. We implement 2D convolution, understand stride and padding, and build feature maps for image classification.",
          taskDescription: "Apply a 2x2 average pooling to matrix [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]. Print the 2x2 result.",
          initialCode: "# Task: 2x2 average pooling\nmatrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "dl_05",
          title: "Recurrent Networks & LSTMs",
          content: "RNNs process sequential data by maintaining hidden state. LSTMs solve the vanishing gradient problem with forget, input, and output gates.",
          taskDescription: "Simulate a simple RNN cell: h_new = tanh(W_h * h_old + W_x * x). With h_old=0.5, x=1.0, W_h=0.8, W_x=0.6, print h_new.",
          initialCode: "import math\n# Task: Simple RNN cell computation\nh_old = 0.5\nx = 1.0\nW_h = 0.8\nW_x = 0.6\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module05;
