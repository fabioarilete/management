import React, { Dispatch, SetStateAction, useEffect } from 'react';
import Header from '../../components/Header';
import ModalComponent from '../../components/modal/ModalComponent';
import { Input } from '../../components/form/input/Input';
import { SelectUnits } from '../../components/form/selectUnits/Selectunits';
import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';
import { OperationTypes } from './types/OperationTypes';
import { useOperations } from '../../contexts/OperationContext';
import { RadioButton } from '../../components/form/radioButton/RadioButton';

interface FormOperationsProps {
  operation: OperationTypes;
  setOperation: Dispatch<SetStateAction<OperationTypes>>;
  handleSubmit(operation: OperationTypes): void;
}

export const OperationForm = ({ operation, setOperation, handleSubmit }: FormOperationsProps) => {
  const { selectedOperation, setSelectedOperation, setModalNewOperation } = useOperations();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!selectedOperation) {
      return;
    }
    setOperation(selectedOperation);
  }, [setOperation, selectedOperation]);

  function _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit({ ...operation });
    handleClose();
  }

  function handleClose() {
    if (selectedOperation) {
      setSelectedOperation(null);
    }
    setModalNewOperation(false);
  }
  return (
    <ModalComponent>
      <form onSubmit={_handleSubmit}>
        <Header title="NOVA OPERAÇÃO" subTitle="Cadastre uma nova operação" />
        <Input
          type="text"
          value={operation.name}
          label="Descrição da Operação"
          name="name"
          placeholder="Descreva a operação"
          onChange={event =>
            setOperation({
              ...operation,
              name: event.currentTarget.value.toUpperCase(),
            })
          }
        />
        <Input
          type="number"
          value={operation.valor}
          label="Valor"
          name="valor"
          placeholder="Informe o valor da operação"
          onChange={event =>
            setOperation({
              ...operation,
              valor: Number(event.currentTarget.value),
            })
          }
        />
        <SelectUnits
          label="Unidade"
          name="unid"
          value={operation.unid}
          onChange={event =>
            setOperation({
              ...operation,
              unid: event.currentTarget.value,
            })
          }
        />
        <Typography color={colors.grey[100]}> Tipo de Operação</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          border={`1px solid ${colors.grey[100]}`}
          bgcolor={colors.blueAccent[700]}
        >
          <RadioButton
            name="tipoOperation"
            label="Comum"
            value={1}
            onChange={event =>
              setOperation({
                ...operation,
                tipoOperation: event.target.value,
              })
            }
          />
          <RadioButton
            name="tipoOperation"
            label="Injeção"
            value={0}
            onChange={event =>
              setOperation({
                ...operation,
                tipoOperation: event.target.value,
              })
            }
          />
        </Box>

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
