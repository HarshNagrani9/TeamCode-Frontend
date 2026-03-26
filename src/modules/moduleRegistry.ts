import type { ModuleData } from './types';
import module01 from './data/module01-python';
import module02 from './data/module02-preprocessing';
import module03 from './data/module03-geometric-math';
import module04 from './data/module04-classical-ml';
import module05 from './data/module05-deep-learning';
import module06 from './data/module06-rag-systems';
import module07 from './data/module07-shipping-ai';

const moduleMap: Record<number, ModuleData> = {
  1: module01,
  2: module02,
  3: module03,
  4: module04,
  5: module05,
  6: module06,
  7: module07,
};

export function getModuleData(moduleId: number): ModuleData | null {
  return moduleMap[moduleId] ?? null;
}

export function getAllModuleIds(): number[] {
  return Object.keys(moduleMap).map(Number);
}
