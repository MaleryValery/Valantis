import { FiltersType } from './types';

export const setDisabled = (object1: FiltersType, object2: FiltersType) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};
