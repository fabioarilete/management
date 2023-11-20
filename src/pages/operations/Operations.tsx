import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { OperationTypes } from './types/OperationTypes';
import OperationItem from './OperationItem';
import OperationItemHeader from './OperationItemHeader';
import NewOperation from './new/NewOperation';
import UpdateOperation from './update/UpdateOperation';
import { OperationProvider } from '../../contexts/OperationContext';

const inicialState: OperationTypes = {
  id: '' as any,
  name: '',
  valor: '' as any,
  unid: '',
  tipoOperation: '',
};

const Operations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [operation, setOperation] = useState<OperationTypes>(inicialState);
  const [operations, setOperations] = useState<any[]>([]);
  const [selectedOperation, setSelectedOperation] = useState<OperationTypes | null>(null);
  const [modalNewOperation, setModalNewOperation] = useState(false);

  useEffect(() => {
    api
      .get('operationsList')
      .then(res => {
        setOperations(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  function handleRemove(id: number) {
    api
      .delete(`operationsList/${id}`)
      .then(() => {
        setOperations(state => state.filter(operation => operation.id !== id));
        toast.success('Operação removida com sucesso!');
      })
      .catch(err => console.log(err));
  }
  function openOperationForm() {
    setModalNewOperation(true);
  }
  return (
    <OperationProvider
      value={{
        handleRemove,
        setOperations,
        operations,
        modalNewOperation,
        setModalNewOperation,
        selectedOperation,
        setSelectedOperation,
        operation,
        setOperation,
      }}
    >
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" border={colors.greenAccent[500]}>
          <Header title="OPERAÇÕES" subTitle="Lista das operações cadastradas" />
          <Button
            onClick={openOperationForm}
            sx={{ bgcolor: `${colors.greenAccent[500]}`, color: `${colors.grey[100]}`, height: '100%' }}
            variant="text"
          >
            Cadastrar Nova Operação
          </Button>
        </Box>
        {modalNewOperation && <NewOperation />}
        {selectedOperation && <UpdateOperation />}

        <Box>
          <OperationItemHeader />
        </Box>
        <Box height="67vh" border={`1px solid ${colors.greenAccent[400]}`} borderRadius="5px" overflow="auto">
          {operations.map(operation => (
            <OperationItem operation={operation} handleRemove={handleRemove} key={operation.id} />
          ))}
        </Box>
      </Box>
    </OperationProvider>
  );
};

export default Operations;
