import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Header from '../../components/Header';
import ModalComponent from '../../components/modal/ModalComponent';
import { Input } from '../../components/form/input/Input';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';
import { InformationsTypes } from './types/InformationsType';
import { useInformations } from '../../contexts/InformationContext';

interface FormInformationsProps {
  information: InformationsTypes;
  setInformation: Dispatch<SetStateAction<InformationsTypes>>;
  handleSubmit(information: InformationsTypes): void;
}

export const InformationForm = ({ information, setInformation, handleSubmit }: FormInformationsProps) => {
  const { selectedInformation, setSelectedInformation, setModalNewInformation } = useInformations();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!selectedInformation) {
      return;
    }
    setInformation(selectedInformation);
  }, [setInformation, selectedInformation]);

  function _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit({ ...information });
    handleClose();
  }

  function handleClose() {
    if (selectedInformation) {
      setSelectedInformation(null);
    }
    setModalNewInformation(false);
  }
  return (
    <ModalComponent>
      <form onSubmit={_handleSubmit}>
        <Header title="NOVA INFORMAÇÃO" subTitle="Cadastre uma nova informação" />
        <Input
          type="number"
          value={information.cod}
          label="Código do Produto"
          name="cod"
          placeholder="Informe o código do produto"
          onChange={event =>
            setInformation({
              ...information,
              cod: Number(event.currentTarget.value),
            })
          }
        />
        <Input
          type="text"
          value={information.name}
          label="Descrição do Produto"
          name="name"
          placeholder="Descreva o produto"
          onChange={event =>
            setInformation({
              ...information,
              name: event.currentTarget.value.toUpperCase(),
            })
          }
        />
        <Input
          type="number"
          value={information.tabela}
          label="Preço de Tabela"
          name="tabela"
          placeholder="Informe o preço de tabela"
          onChange={event =>
            setInformation({
              ...information,
              tabela: Number(event.currentTarget.value),
            })
          }
        />
        <Input
          type="number"
          value={information.precoMedio}
          label="Preço Médio venddo"
          name="precoMedio"
          placeholder="Informe o preço médio vendido"
          onChange={event =>
            setInformation({
              ...information,
              precoMedio: Number(event.currentTarget.value),
            })
          }
        />

        <Box display="flex" justifyContent="space-around" margin="20px 0">
          <Button type="submit" color={colors.greenAccent[600]} wSize="150px" hSize="35px">
            <Typography color={colors.grey[100]}>CADASTRAR</Typography>
          </Button>
          <Button type="button" onClick={handleClose} color={colors.greenAccent[600]} wSize="150px" hSize="35px">
            <Typography color={colors.grey[100]}>CANCELAR</Typography>
          </Button>
        </Box>
      </form>
    </ModalComponent>
  );
};
