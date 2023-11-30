import React, { useState } from 'react';
import api from '../../../api/api';
import { MaterialTypes } from '../types/MaterialTypes';
import { Modal, ModalTarget } from '../../../components/modal/Modal';
import { toast } from 'react-toastify';
import { useMaterials } from '../../../contexts/MaterialContext';
import { useMaterialTotal } from '../../../hooks/useMaterialTotal';
import { Box } from '@mui/material';
import { MaterialForm } from '../MaterialForm';

const initialState: MaterialTypes = {
  id: '' as any,
  name: '',
  preco: '' as any,
  frete: '' as any,
  icms: '' as any,
  nf: '' as any,
  tipoFornecedor: '',
  total: '' as any,
  unid: '',
};

const NewMaterial = () => {
  const [material, setMaterial] = useState<MaterialTypes>(initialState);
  const { setMaterials } = useMaterials();
  const totalMaterial = useMaterialTotal(material);

  function addMaterial(material: MaterialTypes) {
    const data = { ...material, total: totalMaterial };
    api
      .post('materials', data)
      .then(res => {
        setMaterials(state => [...state, { ...data, id: res.data.id }]);
        toast.success('Material cadastrado com sucesso!');
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(material: MaterialTypes) {
    const { name, preco, icms, frete, nf, tipoFornecedor } = material;
    if (!name || !preco || !icms || !frete || !nf || !tipoFornecedor) {
      toast.error('Preencher todos os campos!');
      return;
    }
    addMaterial(material);
  }
  return (
    <Modal target={ModalTarget.MODAL}>
      <Box>
        <MaterialForm material={material} setMaterial={setMaterial} handleSubmit={handleSubmit} />
      </Box>
    </Modal>
  );
};

export default NewMaterial;
