import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { MarkUpTypes } from '../pages/markUps/types/MarkUpTypes';

interface MarkUpContextValue {
  selectedMarkUp: MarkUpTypes | null;
  setSelectedMarkUp: Dispatch<SetStateAction<MarkUpTypes | null>>;
  markUp: MarkUpTypes | null;
  setMarkUp: Dispatch<SetStateAction<MarkUpTypes>>;
  markUps: MarkUpTypes[];
  setMarkUps: Dispatch<SetStateAction<MarkUpTypes[]>>;
  modalNewMarkUp: boolean;
  setModalNewMarkUp: Dispatch<SetStateAction<boolean>>;
  handleRemove(id: number): void;
}

const MarkUpContext = createContext<MarkUpContextValue>({} as MarkUpContextValue);
export const MarkUpProvider = MarkUpContext.Provider;
export const MarkUpConsumer = MarkUpContext.Consumer;

export function useMarkUps(): MarkUpContextValue {
  return useContext(MarkUpContext);
}
