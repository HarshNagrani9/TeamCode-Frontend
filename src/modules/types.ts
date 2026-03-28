// Shared types for the Module system

export interface SubModule {
  id: string;
  title: string;
  content: string;
  taskDescription: string;
  initialCode: string;
  testScript: string;
  completed: boolean;
}

export interface Chapter {
  title: string;
  subModules: SubModule[];
}

export interface ModuleData {
  id?: string;
  title: string;
  moduleNumber: number;
  chapters: Chapter[];
}
