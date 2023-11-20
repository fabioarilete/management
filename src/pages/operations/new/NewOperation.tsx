import React, { useState } from 'react';
import api from '../../../api/api';
import { Modal, ModalTarget } from '../../../components/modal/Modal';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { OperationTypes } from '../types/OperationTypes';
import { useOperations } from '../../../contexts/OperationContext';
import { OperationForm } from '../OperationForm';

const inicialState: OperationTypes = {
  id: '' as any,
  name: '',
  valor: '' as any,
  unid: '',
  tipoOperation: '',
};

const NewOperation = () => {
  const [operation, setOperation] = useState<OperationTypes>(inicialState);
  const { setOperations } = useOperations();

  function addOperation(operation: OperationTypes) {
    const data = { ...operation };
    api
      .post('operationsList', data)
      .then(res => {
        setOperations(state => [...state, { ...data, id: res.data.id }]);
        toast.success('Operação cadastrada com sucesso!');
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(operation: OperationTypes) {
    const { name, valor, unid } = operation;
    if (!name || !valor || !unid) {
      toast.error('Preencher todos os campos!');
      return;
    }
    addOperation(operation);
  }
  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <OperationForm operation={operation} setOperation={setOperation} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default NewOperation;
