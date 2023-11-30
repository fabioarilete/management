import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { MaterialProvider } from '../../contexts/MaterialContext';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { MaterialTypes } from './types/MaterialTypes';
import MaterialItem from './MaterialItem';
import MaterialItemHeader from './MaterialItemHeader';
import NewMaterial from './new/NewMaterial';
import UpdateMaterial from './update/UpdateMaterial';

const inicialState: MaterialTypes = {
  id: '',
  name: '',
  preco: '' as any,
  frete: '' as any,
  icms: '' as any,
  nf: '' as any,
  tipoFornecedor: '',
  total: '' as any,
  unid: '',
};

const Materials = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [material, setMaterial] = useState<MaterialTypes>(inicialState);
  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialTypes | null>(null);
  const [modalNewMaterial, setModalNewMaterial] = useState(false);

  useEffect(() => {
    api
      .get('materials')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function openMaterialForm() {
    setModalNewMaterial(true);
  }

  function handleRemove(id: string) {
    api
      .delete(`materials/${id}`)
      .then(() => {
        setMaterials(state => state.filter(material => material.id !== id));
        toast.success('Material removido com sucesso!');
      })
      .catch(err => console.log(err));
  }

  return (
    <MaterialProvider
      value={{
        handleRemove,
        setMaterials,
        materials,
        modalNewMaterial,
        setModalNewMaterial,
        selectedMaterial,
        setSelectedMaterial,
        material,
        setMaterial,
      }}
    >
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" border={colors.greenAccent[500]}>
          <Header title="MATERIAIS" subTitle="Lista dos materiais cadastrados" />
          <Button
            onClick={openMaterialForm}
            sx={{ bgcolor: `${colors.greenAccent[500]}`, color: `${colors.grey[100]}`, height: '100%' }}
            variant="text"
          >
            Cadastrar Novo Material
          </Button>
        </Box>
        {modalNewMaterial && <NewMaterial />}
        {selectedMaterial && <UpdateMaterial />}

        <Box>
          <MaterialItemHeader />
        </Box>
        <Box height="67vh" border={`1px solid ${colors.greenAccent[400]}`} borderRadius="5px" overflow="auto">
          {materials.map(material => (
            <MaterialItem material={material} handleRemove={handleRemove} key={material.id} />
          ))}
        </Box>
      </Box>
    </MaterialProvider>
  );
};

export default Materials;
