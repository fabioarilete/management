import React, { useState } from 'react';
import api from '../../../api/api';
import { Modal, ModalTarget } from '../../../components/modal/Modal';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { MarkUpTypes } from '../types/MarkUpTypes';
import { UseMarkUpCoef } from '../../../hooks/useMarkUpCoef';
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

const NewMarkUp = () => {
  const [markUp, setMarkUp] = useState<MarkUpTypes>(inicialState);
  const { setMarkUps } = useMarkUps();
  const coef = UseMarkUpCoef(markUp);

  function addMarkUp(markUp: MarkUpTypes) {
    const data = { ...markUp, coeficiente: coef };
    api
      .post('markUps', data)
      .then(res => {
        setMarkUps(state => [...state, { ...data, id: res.data.id }]);
        toast.success('Mark Up cadastrado com sucesso!');
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(markUp: MarkUpTypes) {
    const { impostos, comissao, adm, frete, financeiro, marketing, promotores, bonificacoes, lucro } = markUp;
    if (
      !impostos ||
      !comissao ||
      !adm ||
      !frete ||
      !financeiro ||
      !marketing ||
      !promotores ||
      !bonificacoes ||
      !lucro
    ) {
      toast.error('Preencher todos os campos!');
      return;
    }
    addMarkUp(markUp);
  }
  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <MarkUpForm markUp={markUp} setMarkUp={setMarkUp} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default NewMarkUp;
