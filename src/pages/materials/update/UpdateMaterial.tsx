import React, { useState } from 'react';
import api from '../../../api/api';
import { MaterialForm } from '../MaterialForm';
import { useMaterials } from '../../../contexts/MaterialContext';
import { toast } from 'react-toastify';
import { useMaterialTotal } from '../../../hooks/useMaterialTotal';
import { Box } from '@mui/material';
import { MaterialTypes } from '../types/MaterialTypes';

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

const UpdateMaterial = () => {
  const [material, setMaterial] = useState<MaterialTypes>(initialState);
  const { setMaterials } = useMaterials();
  const totalMaterial = useMaterialTotal(material);

  function handleSubmit(material: MaterialTypes) {
    const data = { ...material, total: totalMaterial };
    api
      .put(`materialsList/${material.id}`, data)
      .then(res => {
        setMaterials(state =>
          state.map(item => {
            if (material.id === item.id) {
              return material;
            }
            return item;
          }),
        );
        toast.success('Material editado com sucesso!');
      })
      .catch(err => console.log(err));
  }
  return (
    <Box>
      <MaterialForm material={material} setMaterial={setMaterial} handleSubmit={handleSubmit} />
    </Box>
  );
};

export default UpdateMaterial;
