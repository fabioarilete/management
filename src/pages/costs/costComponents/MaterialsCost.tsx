import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import ItemMaterialCost from './ItemMaterialCost';

type Props = {
  removeMaterial(materialUuid: string): void;
  cost: CostTypes;
};

const MaterialsCost = ({ cost, removeMaterial }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" m="5px 25px 15px 10px" flexDirection="column">
        <Box width="100%" display="flex" bgcolor="#1E5245" color={colors.grey[100]} textAlign="center">
          <Box width="35%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Matéria-Prima
            </Typography>
          </Box>
          <Box width="17%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Observação
            </Typography>
          </Box>
          <Box width="10%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Quant
            </Typography>
          </Box>
          <Box width="6%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Unid
            </Typography>
          </Box>
          <Box width="16%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Valor Unitário
            </Typography>
          </Box>
          <Box width="16%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Valor Total
            </Typography>
          </Box>
        </Box>
        {cost.materialsProduct.map(material => (
          <ItemMaterialCost material={material} removeMaterial={removeMaterial} key={material.id} />
        ))}
        <Box display="flex" width="100%">
          <Box width="80%" pr="5px" textAlign="end">
            <Typography fontSize="20px" fontWeight="bold" color="#1E5245">
              Total - Materiais
            </Typography>
          </Box>
          <Box width="20%" pr="5px" bgcolor="#1E5245" textAlign="end">
            <Typography fontSize="20px" fontWeight="bold" color="#fff">
              {formatCurrency(cost.totalMaterials, 'BRL')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MaterialsCost;
