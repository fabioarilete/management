import React from 'react';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import formatCurrency from '../../utils/formatCurrency';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { CostTypes } from './types/CostTypes';
import { useFetchMarkUps } from '../../hooks/useFetchMarkUps';
import { useFetchInfo } from '../../hooks/useFetchInfo';
import { Link } from 'react-router-dom';

type Props = {
  handleRemove(id: string): void;
  cost: CostTypes;
};

const CostItem = ({ cost, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { markUps, loading, error } = useFetchMarkUps();
  const { informations } = useFetchInfo();

  const _markUp = markUps.find(item => item.id === cost.markUpProduct?.id);
  const _informations = informations.find(item => Number(item.cod) === Number(cost.cod));

  const encargos =
    Number(_markUp?.impostos) +
    Number(_markUp?.comissao) +
    Number(_markUp?.adm) +
    Number(_markUp?.frete) +
    Number(_markUp?.financeiro) +
    Number(_markUp?.marketing) +
    Number(_markUp?.promotores) +
    Number(_markUp?.bonificacoes);

  const coef = Number(_markUp?.coeficiente);
  const sugestedPrice = cost.unitCost * coef;
  const realPriceProfit =
    ((Number(_informations?.precoMedio) - (cost.unitCost + Number(_informations?.precoMedio) * (encargos / 100))) /
      Number(_informations?.precoMedio)) *
    100;

  function handleRemoveClick() {
    handleRemove(cost.id);
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
      width="98.5%"
      alignItems="center"
    >
      <Box width="5%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginLeft="5px" color={colors.greenAccent[400]}>
          {cost.cod}
        </Typography>
      </Box>
      <Box width="25%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginLeft="5px" color={colors.greenAccent[400]}>
          {cost.name}
        </Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(cost.totalMaterials, 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(cost.totalOperations, 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(cost.totalCost, 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(cost.unitCost, 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(sugestedPrice, 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(Number(_informations?.tabela), 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(Number(_informations?.precoMedio), 'BRL')}</Typography>
      </Box>
      <Box width="8%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{`${realPriceProfit.toFixed(2)}%`}</Typography>
      </Box>

      <Box width="6%" display="flex" justifyContent="center" alignItems="center">
        <Link to={`/costs/${cost.id}`}>
          <IconButton sx={{ color: colors.grey[100] }} aria-label="edit">
            <EditOutlinedIcon />
          </IconButton>
        </Link>
        <IconButton onClick={handleRemoveClick} sx={{ color: colors.grey[100] }} aria-label="delete">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CostItem;
