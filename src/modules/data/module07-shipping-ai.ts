import type { ModuleData } from '../types';

const module07: ModuleData = {
  title: "Shipping AI",
  moduleNumber: 7,
  chapters: [
    {
      title: "Model Deployment",
      subModules: [
        {
          id: "sa_01",
          title: "REST API with FastAPI",
          content: "FastAPI is the industry standard for serving ML models. We build prediction endpoints with request validation, async processing, and automatic OpenAPI documentation.",
          taskDescription: "Create a dictionary representing an API response with keys 'prediction', 'confidence', 'model_version'. Print it as formatted JSON.",
          initialCode: "import json\n# Task: Create a model prediction response\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "sa_02",
          title: "Containerization with Docker",
          content: "Docker containers package your model, dependencies, and runtime into a portable unit. We write optimized Dockerfiles with multi-stage builds for minimal image size.",
          taskDescription: "Create a list of Docker commands for a Python ML app: ['FROM python:3.10-slim', 'COPY . /app', 'RUN pip install -r requirements.txt', 'CMD [\"python\", \"serve.py\"]']. Print each line.",
          initialCode: "# Task: Define Dockerfile layers\ndockerfile_layers = []\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "sa_03",
          title: "Model Serialization & ONNX",
          content: "Saving models in portable formats like ONNX enables cross-framework deployment. We compare pickle, joblib, TorchScript, and ONNX for different use cases.",
          taskDescription: "Create a dictionary representing model metadata: name, version, format, size_mb. Print it.",
          initialCode: "# Task: Model metadata for deployment\nmodel_meta = {}\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "MLOps & Monitoring",
      subModules: [
        {
          id: "sa_04",
          title: "CI/CD for ML Pipelines",
          content: "Continuous Integration and Deployment for ML includes data validation, model retraining triggers, automated testing, and canary deployments to catch regression.",
          taskDescription: "Create a pipeline_config dict with stages: ['data_validation', 'training', 'evaluation', 'deployment']. Print the number of stages.",
          initialCode: "# Task: Define CI/CD pipeline stages\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "sa_05",
          title: "Monitoring & Drift Detection",
          content: "Deployed models degrade over time as data distributions shift. We implement statistical tests (KS test, PSI) to detect feature and concept drift in real-time.",
          taskDescription: "Compare two distributions: baseline=[1,2,3,4,5] and production=[2,3,4,5,6]. Compute the mean shift and print it.",
          initialCode: "# Task: Detect distribution shift\nbaseline = [1, 2, 3, 4, 5]\nproduction = [2, 3, 4, 5, 6]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module07;
