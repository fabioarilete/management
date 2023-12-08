import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box } from '@mui/material';
import formatCurrency from '../../../utils/formatCurrency';
import ItemMaterialCost from './ItemMaterialCost';
import Item from './Item';

type Props = {
  removeMaterial(materialUuid: string): void;
  cost: CostTypes;
};

const MaterialsCost = ({ cost, removeMaterial }: Props) => {
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" m="5px" flexDirection="column">
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="center"
          bgcolor="#1E5245"
          color="#fff"
          textAlign="center"
        >
          <Item width="33%" fontSize="18px" fontWeight="bold" color="#fff" text="Matéria-Prima" />
          <Item width="17%" fontSize="18px" fontWeight="bold" color="#fff" text="Observação" />
          <Item width="10%" fontSize="18px" fontWeight="bold" color="#fff" text="Quant" />
          <Item width="6%" fontSize="18px" fontWeight="bold" color="#fff" text="Unid" />
          <Item width="13%" fontSize="18px" fontWeight="bold" color="#fff" text="Valor Unit" />
          <Item width="13%" fontSize="18px" fontWeight="bold" color="#fff" text="Valor Total" />
          <Item width="8%" fontSize="18px" fontWeight="bold" color="#fff" text="Ações" />
        </Box>
        {cost.materialsProduct.map(material => (
          <ItemMaterialCost hasEdition material={material} removeMaterial={removeMaterial} key={material.id} />
        ))}
        <Box display="flex" width="100%" height="35px" alignItems="center">
          <Item
            width="80%"
            fontSize="20px"
            fontWeight="bold"
            color="#1E5245"
            textAlign="end"
            text="Total - Materiais"
          />
          <Item
            width="20%"
            fontSize="20px"
            fontWeight="bold"
            color="#fff"
            bgcolor="#1E5245"
            textAlign="end"
            text={formatCurrency(cost.totalMaterials, 'BRL')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MaterialsCost;
