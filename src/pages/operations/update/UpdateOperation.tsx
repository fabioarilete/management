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

const UpdateOperation = () => {
  const [operation, setOperation] = useState<OperationTypes>(inicialState);
  const { setOperations } = useOperations();

  function handleSubmit(operation: OperationTypes) {
    api
      .put(`operations/${operation.id}`, operation)
      .then(res => {
        setOperations(state =>
          state.map(item => {
            if (operation.id === item.id) {
              return operation;
            }
            return item;
          }),
        );
        toast.success('Operação cadastrada com sucesso!');
      })
      .catch(err => console.log(err));
  }

  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <OperationForm operation={operation} setOperation={setOperation} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default UpdateOperation;
