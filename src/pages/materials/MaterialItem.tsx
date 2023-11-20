import React from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { MaterialTypes } from './types/MaterialTypes';
import { useMaterials } from '../../contexts/MaterialContext';
import formatCurrency from '../../utils/formatCurrency';
import { tokens } from '../../theme';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
  handleRemove(id: number): void;
  material: MaterialTypes;
};

const MaterialItem = ({ material, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSelectedMaterial } = useMaterials();

  function editMaterial() {
    setSelectedMaterial(material);
  }
  function handleRemoveClick() {
    handleRemove(material.id);
  }
  return (
    <Box
      sx={[
        {
          '&:hover': {
            bgcolor: `${colors.primary[400]}`,
            color: '#868dfb !important',
          },
        },
      ]}
      borderBottom={`1px solid ${colors.grey[400]}`}
      m="10px"
      display="flex"
      justifyContent="space-around"
      width="98%"
      alignItems="center"
    >
      <Box width="35%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography color={colors.greenAccent[400]}>{material.name}</Typography>
      </Box>
      <Box width="12%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">
          {formatCurrency(material.preco, 'BRL')} {material.unid}
        </Typography>
      </Box>
      <Box width="7%" textAlign="center" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography>{material.frete}%</Typography>
      </Box>
      <Box width="7%" textAlign="center" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography>{material.nf}%</Typography>
      </Box>
      <Box width="7%" textAlign="center" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography>{material.icms}%</Typography>
      </Box>
      <Box width="10%" textAlign="center" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography>{material.tipoFornecedor === '1' ? 'Simples' : 'Presumido'}</Typography>
      </Box>
      <Box width="12%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">
          {formatCurrency(material.total, 'BRL')} {material.unid}
        </Typography>
      </Box>
      <Box width="10%" display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={editMaterial} sx={{ color: colors.grey[100] }} aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleRemoveClick} sx={{ color: colors.grey[100] }} aria-label="delete">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MaterialItem;
