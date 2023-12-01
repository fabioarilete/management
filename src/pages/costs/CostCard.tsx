import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';
import { CostTypes } from './types/CostTypes';
import { useCosts } from '../../contexts/CostsContext';
import formatCurrency from '../../utils/formatCurrency';
import ItemCostCard from './update/ItemCostCard';
import { MarkUpTypes } from '../markUps/types/MarkUpTypes';
import api from '../../api/api';

type Props = {
  handleRemove(id: number): void;
  cost: CostTypes;
};

const inicialState: MarkUpTypes = {
  id: '' as any,
  name: '',
  impostos: '',
  comissao: '',
  adm: '',
  frete: '',
  financeiro: '',
  promotores: '',
  marketing: '',
  bonificacoes: '',
  lucro: '',
  coeficiente: '' as any,
};

const CostCard = ({ cost, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSelectedCost } = useCosts();
  const [markUps, setMarkUps] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('markUps')
      .then(res => {
        setMarkUps(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function editCost() {
    setSelectedCost(cost);
  }

  function handleRemoveClick() {
    handleRemove(cost.id);
  }
  const _markUp = markUps.find(item => item.id === cost.markUpProduct?.id);
  console.log(_markUp);
  const coef = _markUp.coeficiente;

  const encargos =
    Number(_markUp.impostos) +
    Number(_markUp.comissao) +
    Number(_markUp.adm) +
    Number(_markUp.frete) +
    Number(_markUp.financeiro) +
    Number(_markUp.marketing) +
    Number(_markUp.promotores) +
    Number(_markUp.bonificacoes);

  const totalCost = Number(cost.totalCost);
  const unitCost = Number(cost.unitCost);
  const sugestedPrice = unitCost * coef;
  const priceList = Number(cost.informationsProduct?.tabela);
  const mediumPrice = Number(cost.informationsProduct?.precoMedio);
  const descount = ((priceList - mediumPrice) / priceList) * 100;
  const priceListProfit = ((priceList - (unitCost + priceList * (encargos / 100))) / priceList) * 100;
  const realPriceProfit = ((mediumPrice - (unitCost + mediumPrice * (encargos / 100))) / mediumPrice) * 100;

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
        {cost.cod} - {cost.name}
      </Typography>
      <Typography fontSize="16px" fontWeight="bold" color={colors.grey[100]}>
        {cost.unid} - c/ {cost.qt} unidades
      </Typography>
      <br />
      <ItemCostCard title="Matéria-Prima" value={`${formatCurrency(cost.totalMaterials, 'BRL')} ${cost.unid}`} />
      <ItemCostCard title="Mão-de-Obra" value={`${formatCurrency(cost.totalOperations, 'BRL')} ${cost.unid}`} />
      <br />
      <ItemCostCard title="Custo Total" value={`${formatCurrency(cost.totalCost, 'BRL')} ${cost.unid}`} />
      <ItemCostCard title="Custo Unitário" value={`${formatCurrency(cost.unitCost, 'BRL')}`} />
      <br />
      <ItemCostCard title="Preço Unit. Sugerido" value={`${formatCurrency(sugestedPrice, 'BRL')}`} />
      <br />
      <ItemCostCard title="Preço Tabela" value={`${formatCurrency(priceList, 'BRL')}`} />
      <br />
      <ItemCostCard title="Preço Médio vendido" value={`${formatCurrency(mediumPrice, 'BRL')}`} />
      <ItemCostCard title="Margem real" value={`${realPriceProfit.toFixed(2)}%`} />

      <Box flex={1} display="flex" justifyContent="space-around" mb="0">
        <Button type="button" onClick={editCost} color={colors.greenAccent[600]} wSize="43%" hSize="30px">
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

export default CostCard;
