import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Header from '../../components/Header';
import ModalComponent from '../../components/modal/ModalComponent';
import { Input } from '../../components/form/input/Input';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';
import { MarkUpTypes } from './types/MarkUpTypes';
import { useMarkUps } from '../../contexts/MarkUpContext';

interface FormMarkUpsProps {
  markUp: MarkUpTypes;
  setMarkUp: Dispatch<SetStateAction<MarkUpTypes>>;
  handleSubmit(markUp: MarkUpTypes): void;
}

export const MarkUpForm = ({ markUp, setMarkUp, handleSubmit }: FormMarkUpsProps) => {
  const { selectedMarkUp, setSelectedMarkUp, setModalNewMarkUp } = useMarkUps();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!selectedMarkUp) {
      return;
    }
    setMarkUp(selectedMarkUp);
  }, [setMarkUp, selectedMarkUp]);

  function _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit({ ...markUp });
    handleClose();
  }

  function handleClose() {
    if (selectedMarkUp) {
      setSelectedMarkUp(null);
    }
    setModalNewMarkUp(false);
  }
  return (
    <ModalComponent>
      <form onSubmit={_handleSubmit}>
        <Header title="NOVO MARK UP" subTitle="Cadastre um novo Mark Up" />
        <Input
          type="text"
          value={markUp.name}
          label="Descrição do Mark Up"
          name="name"
          placeholder="Descreva o Mark Up"
          onChange={event =>
            setMarkUp({
              ...markUp,
              name: event.currentTarget.value.toUpperCase(),
            })
          }
        />
        <Input
          type="number"
          value={markUp.impostos}
          label="Impostos"
          name="impostos"
          placeholder="Informe o % de impostos"
          onChange={event =>
            setMarkUp({
              ...markUp,
              impostos: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.comissao}
          label="Comissão"
          name="comissao"
          placeholder="Informe o % de comissão"
          onChange={event =>
            setMarkUp({
              ...markUp,
              comissao: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.adm}
          label="Administração"
          name="adm"
          placeholder="Informe o % de administração"
          onChange={event =>
            setMarkUp({
              ...markUp,
              adm: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.frete}
          label="Frete"
          name="frete"
          placeholder="Informe o % de frete"
          onChange={event =>
            setMarkUp({
              ...markUp,
              frete: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.financeiro}
          label="Financeiro"
          name="financeiro"
          placeholder="Informe o % de financeiro"
          onChange={event =>
            setMarkUp({
              ...markUp,
              financeiro: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.marketing}
          label="Marketing"
          name="marketing"
          placeholder="Informe o % de marketing"
          onChange={event =>
            setMarkUp({
              ...markUp,
              marketing: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.promotores}
          label="Promotores"
          name="promotores"
          placeholder="Informe o % de promotores"
          onChange={event =>
            setMarkUp({
              ...markUp,
              promotores: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.bonificacoes}
          label="Bonificações"
          name="bonificacoes"
          placeholder="Informe o % de bonificações"
          onChange={event =>
            setMarkUp({
              ...markUp,
              bonificacoes: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={markUp.lucro}
          label="Lucro"
          name="lucro"
          placeholder="Informe o % de lucro"
          onChange={event =>
            setMarkUp({
              ...markUp,
              lucro: event.currentTarget.value,
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
