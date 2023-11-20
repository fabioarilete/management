import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { OperationTypes } from '../pages/operations/types/OperationTypes';

interface OperationContextValue {
  selectedOperation: OperationTypes | null;
  setSelectedOperation: Dispatch<SetStateAction<OperationTypes | null>>;
  operation: OperationTypes | null;
  setOperation: Dispatch<SetStateAction<OperationTypes>>;
  operations: OperationTypes[];
  setOperations: Dispatch<SetStateAction<OperationTypes[]>>;
  modalNewOperation: boolean;
  setModalNewOperation: Dispatch<SetStateAction<boolean>>;
  handleRemove(id: number): void;
}

const OperationContext = createContext<OperationContextValue>({} as OperationContextValue);
export const OperationProvider = OperationContext.Provider;
export const OperationConsumer = OperationContext.Consumer;

export function useOperations(): OperationContextValue {
  return useContext(OperationContext);
}
