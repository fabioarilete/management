import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import ItemOperationCost from './ItemOperationCost.tsx';
import Item from './Item';

type Props = {
  removeOperation(operationUuid: string): void;
  cost: CostTypes;
};

const OperationsCost = ({ cost, removeOperation }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" m="5px" flexDirection="column">
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="center"
          bgcolor="#881705"
          color={colors.grey[100]}
          textAlign="center"
        >
          <Item width="35%" fontSize="18px" fontWeight="bold" color="#fff" text="Operação" />
          <Item width="23%" fontSize="18px" fontWeight="bold" color="#fff" text="Observação" />
          <Item width="10%" fontSize="18px" fontWeight="bold" color="#fff" text="Quant/HR" />
          <Item width="13%" fontSize="18px" fontWeight="bold" color="#fff" text="Valor HR" />
          <Item width="13%" fontSize="18px" fontWeight="bold" color="#fff" text="Valor Total" />
          <Item width="8%" fontSize="18px" fontWeight="bold" color="#fff" text="Ações" />
        </Box>
        {cost.operationsProduct.map(operation => (
          <ItemOperationCost hasEdition operation={operation} removeOperation={removeOperation} key={operation.id} />
        ))}
        <Box display="flex" width="100%" height="35px" alignItems="center">
          <Item
            width="80%"
            fontSize="20px"
            fontWeight="bold"
            color="#881705"
            textAlign="end"
            text="Total - Operações"
          />
          <Item
            width="20%"
            fontSize="20px"
            fontWeight="bold"
            color="#fff"
            bgcolor="#881705"
            textAlign="end"
            text={formatCurrency(cost.totalOperations, 'BRL')}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OperationsCost;
