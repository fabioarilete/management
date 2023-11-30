import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CostOperation, CostTypes } from '../types/CostTypes';
import { OperationTypes } from '../../operations/types/OperationTypes';
import api from '../../../api/api';
import { SelectOptions } from '../../../components/form/selectOptions/SelectOptions';
import { Input } from '../../../components/form/input/Input';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import Header from '../../../components/Header';
import { Button } from '../../../components/form/button/Style';

interface CostTypesForm {
  cost: CostTypes;
  setCost: Dispatch<SetStateAction<CostTypes>>;
  handleValidation(cost: CostTypes): void;
  handleLastStep(step?: number): void;
  handleSubmit(cost: CostTypes): void;
}

const SourceOperationsForm = ({ cost, setCost, handleLastStep, handleSubmit, handleValidation }: CostTypesForm) => {
  const [operations, setOperations] = useState<OperationTypes[]>([]);
  const [selectedOperationId, setSelectedOperationId] = useState<string>();
  const [qt, setQt] = useState('');
  const [obs, setObs] = useState('');
  const [cav, setCav] = useState('');
  const [ciclo, setCiclo] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    api
      .get('operations')
      .then(res => {
        setOperations(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const selectedOperation = useMemo((): OperationTypes | CostOperation | null => {
    if (!selectedOperationId) {
      return null;
    }

    const operation = operations.find(item => item.id === selectedOperationId);

    if (!operation) {
      return null;
    }

    return operation;
  }, [selectedOperationId, operations]);

  function addOperation(e: any) {
    e.preventDefault();
    if (!selectedOperation) {
      return;
    }
    let totalItemOperation = 0;
    selectedOperation.tipoOperation === '1'
      ? (totalItemOperation = selectedOperation.valor / Number(qt))
      : (totalItemOperation = selectedOperation.valor / (((3600 / Number(ciclo)) * Number(cav)) / Number(cost.qt)));

    const data: CostOperation = {
      ...selectedOperation,
      totalItemOperation,
      qt,
      obs,
      cav,
      ciclo,
      uuid: uuidv4(),
    };

    setCost(state => ({
      ...state,
      operationsProduct: [...state.operationsProduct, data],
    }));
    setObs('');
    setQt('');
    setCav('');
    setCiclo('');
  }
  function _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit({ ...cost });
  }

  console.log(selectedOperation?.tipoOperation);

  return (
    <Box
      overflow="auto"
      height="70vh"
      width="100%"
      display="flex"
      flexDirection="column"
      padding="10px"
      border={`1px solid ${colors.greenAccent[600]}`}
      borderRadius="5px"
    >
      <form className="form" onSubmit={_handleSubmit}>
        <Box>
          <Header title="ADIÇÃO DE OPERAÇÕES" subTitle="" />
        </Box>

        <SelectOptions
          value={selectedOperationId}
          onChange={event => setSelectedOperationId(event.target.value)}
          label="Operação"
        >
          {operations.map(item => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </SelectOptions>
        <br />
        <Box display="flex" justifyContent="center">
          <Typography>Preço do {selectedOperation && selectedOperation.unid}.....</Typography>
          {selectedOperation && formatCurrency(selectedOperation.valor, 'BRL')}
        </Box>
        <br />

        {selectedOperation?.tipoOperation === '1' ? (
          <>
            <Input
              type="text"
              label="Observação"
              name="obs"
              placeholder="Faça uma Observação"
              value={obs}
              onChange={event => setObs(event.target.value)}
            />

            <Input
              type="number"
              label="Quantidade"
              name="qt"
              placeholder="Informe a quantidade"
              value={qt}
              onChange={event => setQt(event.target.value)}
            />
          </>
        ) : (
          selectedOperation?.tipoOperation === '0' && (
            <>
              <Input
                type="text"
                label="Observação"
                name="obs"
                placeholder="Faça uma Observação"
                value={obs}
                onChange={event => setObs(event.target.value)}
              />

              <Input
                type="number"
                label="Cavidades"
                name="cav"
                placeholder="Informe a quantidade"
                value={cav}
                onChange={event => setCav(event.target.value)}
              />

              <Input
                type="number"
                label="Ciclo"
                name="ciclo"
                placeholder="Informe a quantidade"
                value={ciclo}
                onChange={event => setCiclo(event.target.value)}
              />
            </>
          )
        )}
        <Box display="flex" justifyContent="space-around" margin="20px 0">
          <Button
            type="button"
            onClick={() => handleLastStep()}
            color={colors.greenAccent[600]}
            wSize="30%"
            hSize="55px"
          >
            <Typography color={colors.grey[100]}>VOLTAR</Typography>
          </Button>
          <Button type="button" onClick={addOperation} color={colors.greenAccent[600]} wSize="30%" hSize="55px">
            <Typography color={colors.grey[100]}>ADD + OPERAÇÕES</Typography>
          </Button>
          <Button type="submit" color={colors.greenAccent[600]} wSize="30%" hSize="55px">
            <Typography color={colors.grey[100]}>CONCLUIR</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SourceOperationsForm;
