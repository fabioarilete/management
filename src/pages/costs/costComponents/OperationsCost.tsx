import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import ItemOperationCost from './ItemOperationCost.tsx';

type Props = {
  removeOperation(operationUuid: string): void;
  cost: CostTypes;
};

const OperationsCost = ({ cost, removeOperation }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" m="5px 30px 15px 10px" flexDirection="column">
        <Box width="100%" display="flex" bgcolor="#881705" color={colors.grey[100]} textAlign="center">
          <Box width="35%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Operação
            </Typography>
          </Box>
          <Box width="27%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Observação
            </Typography>
          </Box>
          <Box width="10%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Quant
            </Typography>
          </Box>

          <Box width="16%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Valor Hora
            </Typography>
          </Box>
          <Box width="16%">
            <Typography fontSize="16px" fontWeight="bold" color="#fff">
              Valor Total
            </Typography>
          </Box>
        </Box>
        {cost.operationsProduct.map(operation => (
          <ItemOperationCost operation={operation} removeOperation={removeOperation} key={operation.id} />
        ))}
        <Box display="flex" width="100%">
          <Box width="80%" pr="5px" textAlign="end">
            <Typography fontSize="20px" fontWeight="bold" color="#881705">
              Total - Operações
            </Typography>
          </Box>
          <Box width="20%" pr="5px" bgcolor="#881705" textAlign="end">
            <Typography fontSize="20px" fontWeight="bold" color="#fff">
              {formatCurrency(cost.totalOperations, 'BRL')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OperationsCost;
