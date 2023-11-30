import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { InformationsTypes } from '../pages/informations/types/InformationsType';

interface InformationContextValue {
  selectedInformation: InformationsTypes | null;
  setSelectedInformation: Dispatch<SetStateAction<InformationsTypes | null>>;
  information: InformationsTypes | null;
  setInformation: Dispatch<SetStateAction<InformationsTypes>>;
  informations: InformationsTypes[];
  setInformations: Dispatch<SetStateAction<InformationsTypes[]>>;
  modalNewInformation: boolean;
  setModalNewInformation: Dispatch<SetStateAction<boolean>>;
  handleRemove(id: string): void;
}

const InformationContext = createContext<InformationContextValue>({} as InformationContextValue);
export const InformationProvider = InformationContext.Provider;
export const InformationConsumer = InformationContext.Consumer;

export function useInformations(): InformationContextValue {
  return useContext(InformationContext);
}
