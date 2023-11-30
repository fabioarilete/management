import React from 'react';
import { useMarkUps } from '../../contexts/MarkUpContext';
import { MarkUpTypes } from './types/MarkUpTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';

type Props = {
  handleRemove(id: string): void;
  markUp: MarkUpTypes;
};

const MarkUpCard = ({ markUp, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSelectedMarkUp } = useMarkUps();

  function editMarkUp() {
    setSelectedMarkUp(markUp);
  }

  function handleRemoveClick() {
    handleRemove(markUp.id);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="22%"
      m="10px"
      p="10px"
      bgcolor={colors.blueAccent[800]}
      borderRadius="5px"
      border={`1px solid ${colors.greenAccent[600]}`}
    >
      <Typography fontSize="18px" fontWeight="bold" color={colors.blueAccent[300]}>
        {markUp.name}
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Impostos:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.impostos} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Comissão:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.comissao} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Administração:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.adm} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Frete:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.frete} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Financeiro:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.financeiro} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Marketing:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.marketing} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Promotores:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.promotores} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Bonificações:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.bonificacoes} %
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Lucro:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.lucro} %
        </Typography>
      </Box>
      <br />
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="18px" color={colors.grey[100]}>
          Coeficiente:
        </Typography>
        <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
          {markUp.coeficiente.toFixed(2)}
        </Typography>
      </Box>
      <Box flex={1} display="flex" justifyContent="space-around" mb="0">
        <Button type="button" onClick={editMarkUp} color={colors.greenAccent[600]} wSize="43%" hSize="30px">
          <Typography
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            fontWeight="bold"
            color={colors.grey[100]}
          >
            EDITAR
          </Typography>
        </Button>
        <Button type="button" onClick={handleRemoveClick} color={colors.greenAccent[600]} wSize="43%" hSize="30px">
          <Typography fontWeight="bold" color={colors.grey[100]}>
            EXCLUIR
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default MarkUpCard;
