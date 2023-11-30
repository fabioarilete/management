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

const UpdateInformation = () => {
  const [information, setInformation] = useState<InformationsTypes>(inicialState);
  const { setInformations } = useInformations();

  function handleSubmit(information: InformationsTypes) {
    api
      .put(`informations/${information.id}`, information)
      .then(res => {
        setInformations(state =>
          state.map(item => {
            if (information.id === item.id) {
              return information;
            }
            return item;
          }),
        );
        toast.success('Informação cadastrada com sucesso!');
      })
      .catch(err => console.log(err));
  }

  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <InformationForm information={information} setInformation={setInformation} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default UpdateInformation;
