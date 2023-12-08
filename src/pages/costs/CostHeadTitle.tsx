import { Box, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../theme';
import CostItemHead from './CostItemHead';

type Props = {};

const CostHeadTitle = (props: Props) => {
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
      <CostItemHead width="5%" title="CÓD" />
      <CostItemHead width="25%" title="PRODUTO" />
      <CostItemHead width="8%" title="CUSTO MP" />
      <CostItemHead width="8%" title="CUSTO MO" />
      <CostItemHead width="8%" title="CUSTO TOTAL" />
      <CostItemHead width="8%" title="CUSTO UNIT" />
      <CostItemHead width="8%" title="PRECO IDEAL" />
      <CostItemHead width="8%" title="TABELA" />
      <CostItemHead width="8%" title="PREÇO MÉDIO" />
      <CostItemHead width="8%" title="MARGEM REAL" />
      <CostItemHead width="6%" title="AÇÕES" />
    </Box>
  );
};

export default CostHeadTitle;
