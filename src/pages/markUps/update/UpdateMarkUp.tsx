import React, { useState } from 'react';
import api from '../../../api/api';
import { Modal, ModalTarget } from '../../../components/modal/Modal';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { MarkUpTypes } from '../types/MarkUpTypes';
import { useMarkUps } from '../../../contexts/MarkUpContext';
import { MarkUpForm } from '../MarkUpForm';

const inicialState: MarkUpTypes = {
  id: '' as any,
  name: '',
  impostos: '',
  comissao: '',
  adm: '',
  frete: '',
  financeiro: '',
  promotores: '',
  marketing: '',
  bonificacoes: '',
  lucro: '',
  coeficiente: '' as any,
};

const UpDateMarkUp = () => {
  const [markUp, setMarkUp] = useState<MarkUpTypes>(inicialState);
  const { setMarkUps } = useMarkUps();

  function handleSubmit(markUp: MarkUpTypes) {
    api
      .put(`markUpsList/${markUp.id}`, markUp)
      .then(res => {
        setMarkUps(state =>
          state.map(item => {
            if (markUp.id === item.id) {
              return markUp;
            }
            return item;
          }),
        );
        toast.success('Mark Up editado com sucesso!');
      })
      .catch(err => console.log(err));
  }

  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <MarkUpForm markUp={markUp} setMarkUp={setMarkUp} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default UpDateMarkUp;
