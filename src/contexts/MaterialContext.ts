import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { MaterialTypes } from '../pages/materials/types/MaterialTypes';

interface MaterialContextValue {
  selectedMaterial: MaterialTypes | null;
  setSelectedMaterial: Dispatch<SetStateAction<MaterialTypes | null>>;
  material: MaterialTypes | null;
  setMaterial: Dispatch<SetStateAction<MaterialTypes>>;
  materials: MaterialTypes[];
  setMaterials: Dispatch<SetStateAction<MaterialTypes[]>>;
  modalNewMaterial: boolean;
  setModalNewMaterial: Dispatch<SetStateAction<boolean>>;
  handleRemove(id: string): void;
}

const MaterialContext = createContext<MaterialContextValue>({} as MaterialContextValue);
export const MaterialProvider = MaterialContext.Provider;
export const MaterialConsumer = MaterialContext.Consumer;

export function useMaterials(): MaterialContextValue {
  return useContext(MaterialContext);
}
