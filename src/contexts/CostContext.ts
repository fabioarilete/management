import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CostTypes } from '../pages/costs/types/CostTypes';

interface CostContextValue {
  step?: number;
  setStep?: Dispatch<SetStateAction<number>>;
  cost: CostTypes | null;
  setCost?: Dispatch<SetStateAction<CostTypes>>;
  costs?: CostTypes[];
  setCosts: Dispatch<SetStateAction<CostTypes[]>>;
  handleNextStep?: () => void;
  handleLastStep?: () => void;
  handleRemove?(id: string): void;
  selectedCost?: CostTypes | null;
  setSelectedCost?: Dispatch<SetStateAction<CostTypes | null>>;
  modalUpdateCost?: boolean;
  setModalUpdateCost?: Dispatch<SetStateAction<boolean>>;
}

const CostContext = createContext<CostContextValue>({} as CostContextValue);
export const CostProvider = CostContext.Provider;
export const CostConsumer = CostContext.Consumer;

export function useCosts(): CostContextValue {
  return useContext(CostContext);
}
