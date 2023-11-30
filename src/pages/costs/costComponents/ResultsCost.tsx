import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box } from '@mui/material';
import ItemResultsCost from './ItemResultsCost';
import formatCurrency from '../../../utils/formatCurrency';

type Props = {
  cost: CostTypes;
};

const ResultsCost = ({ cost }: Props) => {
  const encargos =
    Number(cost.markUpProduct?.impostos) +
    Number(cost.markUpProduct?.comissao) +
    Number(cost.markUpProduct?.adm) +
    Number(cost.markUpProduct?.frete) +
    Number(cost.markUpProduct?.financeiro) +
    Number(cost.markUpProduct?.marketing) +
    Number(cost.markUpProduct?.promotores) +
    Number(cost.markUpProduct?.bonificacoes);

  const totalCost = Number(cost.totalCost);
  const unitCost = Number(cost.unitCost);
  const coef = Number(cost.markUpProduct?.coeficiente);
  const sugestedPrice = unitCost * coef;
  const priceList = Number(cost.informationsProduct?.tabela);
  const mediumPrice = Number(cost.informationsProduct?.precoMedio);
  const descount = ((priceList - mediumPrice) / priceList) * 100;
  const priceListProfit = ((priceList - (unitCost + priceList * (encargos / 100))) / priceList) * 100;
  const realPriceProfit = ((mediumPrice - (unitCost + mediumPrice * (encargos / 100))) / mediumPrice) * 100;

  return (
    <Box display="flex" flex="0.80" m="15px" flexDirection="column">
      <ItemResultsCost
        cost={cost}
        value={`${formatCurrency(totalCost, 'BRL')}`}
        description={`Custo Total - ${cost.unid}`}
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color2)"
        valueBorderColor="var(--color2)"
        valueFontColor="var(--color4)"
      />
      <ItemResultsCost
        cost={cost}
        value={`${formatCurrency(unitCost, 'BRL')}`}
        description="Custo Unitário"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color2)"
        valueBorderColor="var(--color2)"
        valueFontColor="var(--color4)"
      />
      <br />
      <ItemResultsCost
        cost={cost}
        value={`${formatCurrency(sugestedPrice, 'BRL')}`}
        description="Preço de Venda Sugerido"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color4)"
        valueBorderColor="var(--color4)"
        valueFontColor="var(--color4)"
      />
      <br />
      <ItemResultsCost
        cost={cost}
        value={`${formatCurrency(priceList, 'BRL')}`}
        description="Preço de Tabela - Unitário"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color10)"
        valueBorderColor="var(--color10)"
        valueFontColor="var(--color4)"
      />
      <ItemResultsCost
        cost={cost}
        value={`${priceListProfit.toFixed(2)} %`}
        description="Margem de Lucro - Tabela"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color10)"
        valueBorderColor="var(--color10)"
        valueFontColor="var(--color4)"
      />
      <br />
      <ItemResultsCost
        cost={cost}
        value={`${descount.toFixed(2)} %`}
        description="Desconto Médio Aplicado"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color1)"
        valueBorderColor="var(--color1)"
        valueFontColor="var(--color4)"
      />
      <br />
      <ItemResultsCost
        cost={cost}
        value={`${formatCurrency(mediumPrice, 'BRL')}`}
        description="Preço Médio Vendido - Unitário"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color9)"
        valueBorderColor="var(--color9)"
        valueFontColor="var(--color4)"
      />
      <ItemResultsCost
        cost={cost}
        value={`${realPriceProfit.toFixed(2)} %`}
        description="Margem de Lucro - Real"
        descriptionFontColor="#fff"
        descriptionBgColor="var(--color9)"
        valueBorderColor="var(--color9)"
        valueFontColor="var(--color4)"
      />
    </Box>
  );
};

export default ResultsCost;
