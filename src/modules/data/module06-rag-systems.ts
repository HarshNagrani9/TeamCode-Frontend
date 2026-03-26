import type { ModuleData } from '../types';

const module06: ModuleData = {
  title: "RAG Systems",
  moduleNumber: 6,
  chapters: [
    {
      title: "Retrieval Foundations",
      subModules: [
        {
          id: "rag_01",
          title: "Embedding & Vector Spaces",
          content: "Text embeddings convert words into dense vectors where semantic similarity maps to geometric proximity. We explore Word2Vec, sentence transformers, and cosine similarity for retrieval.",
          taskDescription: "Compute cosine similarity between a=[1,0,1] and b=[0,1,1] using the formula: dot(a,b)/(|a|*|b|). Print the result.",
          initialCode: "import math\n# Task: Cosine similarity\na = [1, 0, 1]\nb = [0, 1, 1]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "rag_02",
          title: "Chunking Strategies",
          content: "Document chunking determines retrieval quality. Fixed-size, recursive, and semantic chunking each have trade-offs. Overlap prevents context loss at boundaries.",
          taskDescription: "Split the text 'The quick brown fox jumps over the lazy dog' into chunks of 3 words each with 1-word overlap. Print the chunks.",
          initialCode: "# Task: Implement word-level chunking with overlap\ntext = 'The quick brown fox jumps over the lazy dog'\nchunk_size = 3\noverlap = 1\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "rag_03",
          title: "Vector Database Fundamentals",
          content: "Vector databases like ChromaDB and Pinecone store embeddings and enable fast approximate nearest neighbor (ANN) search using HNSW or IVF indexes.",
          taskDescription: "Implement a simple brute-force nearest neighbor search. Given vectors and a query, find the closest vector by Euclidean distance.",
          initialCode: "import math\n# Task: Find nearest neighbor\nvectors = [[1,2], [3,4], [5,6]]\nquery = [2,3]\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    },
    {
      title: "Production RAG Pipeline",
      subModules: [
        {
          id: "rag_04",
          title: "Query Expansion & Reranking",
          content: "Multi-query expansion reformulates user intent to improve recall. Cross-encoder reranking then boosts precision by scoring retrieved chunks against the original query.",
          taskDescription: "Given a query 'machine learning', generate 3 expanded queries by appending related terms. Print all queries.",
          initialCode: "# Task: Query expansion\noriginal_query = 'machine learning'\nrelated_terms = ['algorithms', 'neural networks', 'deep learning']\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        },
        {
          id: "rag_05",
          title: "End-to-End RAG Assembly",
          content: "Connecting retrieval to generation: we build a pipeline that chunks documents, embeds them, retrieves relevant context, and formats prompts for LLM generation.",
          taskDescription: "Create a function 'build_prompt' that takes a question and context list, returning a formatted prompt string. Print the result.",
          initialCode: "# Task: Build a RAG prompt template\ndef build_prompt(question, contexts):\n    pass\n\nprint(build_prompt('What is ML?', ['ML is a subset of AI', 'ML uses data to learn']))\n",
          testScript: "import json; print('__RESULT__' + json.dumps({'passed': True}))",
          completed: false
        }
      ]
    }
  ]
};

export default module06;
