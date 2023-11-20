import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const MaterialItemHeader = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      bgcolor={`${colors.blueAccent[600]}`}
      border={`1px solid ${colors.grey[400]}`}
      m="10px"
      display="flex"
      justifyContent="space-around"
      width="100%"
      alignItems="center"
      p="5px"
      margin="0"
    >
      <Box width="35%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>DESCRIÇÃO MATERIAL</Typography>
      </Box>
      <Box width="12%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>PREÇO INICIAL</Typography>
      </Box>
      <Box width="7%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>FRETE</Typography>
      </Box>
      <Box width="7%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>NF</Typography>
      </Box>
      <Box width="7%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>ICMS</Typography>
      </Box>
      <Box width="10%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>FORNECEDOR</Typography>
      </Box>
      <Box width="12%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>PREÇO FINAL</Typography>
      </Box>
      <Box width="10%" display="flex" justifyContent="center" alignItems="center">
        <Typography>AÇÕES</Typography>
      </Box>
    </Box>
  );
};

export default MaterialItemHeader;
