import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CostTypes } from '../pages/costs/types/CostTypes';

interface CostsContextValue {
  cost: CostTypes | null;
  setCost: Dispatch<SetStateAction<CostTypes>>;
  costs: CostTypes[];
  setCosts: Dispatch<SetStateAction<CostTypes[]>>;
  handleRemove(id: number): void;
  selectedCost: CostTypes | null;
  setSelectedCost: Dispatch<SetStateAction<CostTypes | null>>;
  modalUpdateCost: boolean;
  setModalUpdateCost: Dispatch<SetStateAction<boolean>>;
}

const CostsContext = createContext<CostsContextValue>({} as CostsContextValue);
export const CostsProvider = CostsContext.Provider;
export const CostsConsumer = CostsContext.Consumer;

export function useCosts(): CostsContextValue {
  return useContext(CostsContext);
}
