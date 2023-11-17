import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MaterialProvider } from '../../contexts/MaterialContext';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { MaterialTypes } from './types/MaterialTypes';

const inicialState: MaterialTypes = {
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

const Materials = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [material, setMaterial] = useState<MaterialTypes>(inicialState);
  const [materials, setMaterials] = useState<any[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialTypes | null>(null);
  const [modalNewMaterial, setModalNewMaterial] = useState(false);

  useEffect(() => {
    api
      .get('materialsList')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function openMaterialForm() {
    setModalNewMaterial(true);
  }

  function handleRemove(id: number) {
    api
      .delete(`materialsList/${id}`)
      .then(() => {
        setMaterials(state => state.filter(material => material.id !== id));
        toast.success('Material removido com sucesso!');
      })
      .catch(err => console.log(err));
  }

  const columns = [
    {
      field: 'name',
      minWidth: 250,
      headerName: 'Descrição do Material',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    { field: 'preco', headerName: 'Preço Inicial', flex: 1 },
    { field: 'frete', headerName: 'Frete', flex: 1 },
    { field: 'nf', headerName: 'NF', flex: 1 },
    { field: 'icms', headerName: 'ICMS', flex: 1 },
    { field: 'tipoFornecedor', headerName: 'Fornecedor', flex: 1 },
    { field: 'total', headerName: 'Preço Final', flex: 1 },
    { field: 'unid', headerName: 'Unid', flex: 1 },
    { field: 'actions', headerName: 'Ações', flex: 1 },
  ];
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
        <Header title="MATERIAIS" subTitle="Lista dos materiais cadastrados" />
        <Box
          m="40px 0 0 0 "
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
            '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid rows={materials} columns={columns} components={{ Toolbar: GridToolbar }} />
        </Box>
      </Box>
    </MaterialProvider>
  );
};

export default Materials;
