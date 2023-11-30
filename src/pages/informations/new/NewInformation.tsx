import React, { useState } from 'react';
import api from '../../../api/api';
import { Modal, ModalTarget } from '../../../components/modal/Modal';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import { InformationsTypes } from '../types/InformationsType';
import { useInformations } from '../../../contexts/InformationContext';
import { InformationForm } from '../InformationForm';

const inicialState: InformationsTypes = {
  id: '',
  cod: '' as any,
  name: '',
  tabela: '' as any,
  precoMedio: '' as any,
};

const NewInformation = () => {
  const [information, setInformation] = useState<InformationsTypes>(inicialState);
  const { setInformations } = useInformations();

  function addInformation(information: InformationsTypes) {
    const data = { ...information };
    api
      .post('informations', data)
      .then(res => {
        setInformations(state => [...state, { ...data, id: res.data.id }]);
        toast.success('Operação cadastrada com sucesso!');
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(information: InformationsTypes) {
    addInformation(information);
  }
  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <InformationForm information={information} setInformation={setInformation} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default NewInformation;
