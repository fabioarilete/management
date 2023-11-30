import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const InformationItemHeader = () => {
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
      <Box width="7.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>CÓDIGO</Typography>
      </Box>
      <Box width="47.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>PRODUTO</Typography>
      </Box>
      <Box width="11.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>PREÇO DE TABELA</Typography>
      </Box>
      <Box width="11.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>PREÇO MÉDIO</Typography>
      </Box>
      <Box width="12%" display="flex" justifyContent="center" alignItems="center">
        <Typography>AÇÕES</Typography>
      </Box>
    </Box>
  );
};

export default InformationItemHeader;
