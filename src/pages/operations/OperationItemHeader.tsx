import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const OperationItemHeader = () => {
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
      <Box width="53.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>DESCRIÇÃO DAS OPERAÇÕES</Typography>
      </Box>
      <Box width="17.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>TIPO DE OPERAÇÃO</Typography>
      </Box>
      <Box width="17.5%" borderRight={`1px solid ${colors.grey[400]}`} textAlign="center">
        <Typography>VALOR DA OPERAÇÃO</Typography>
      </Box>
      <Box width="11.5%" display="flex" justifyContent="center" alignItems="center">
        <Typography>AÇÕES</Typography>
      </Box>
    </Box>
  );
};

export default OperationItemHeader;
