import React from 'react';
import { CostOperation } from '../types/CostTypes';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
  removeOperation(id: string): void;
  operation: CostOperation;
};

const ItemOperationCost = ({ operation, removeOperation }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexDirection="column">
        <Box width="100%" display="flex" alignItems="center" borderBottom={`0.5px solid ${colors.grey[300]}`}>
          <Box width="35%" borderLeft={`8px solid #881705`}>
            <Typography pl="5px" textAlign="start" fontSize="16px" fontWeight="600" color="var(--color4)">
              {operation.name}
            </Typography>
          </Box>
          <Box width="27%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            {operation.tipoOperation === '0' ? (
              <Typography fontSize="12px" textAlign="center" fontWeight="600" color="var(--color4)">
                {operation.obs} - Cav: {operation.cav} - Ciclo: {operation.ciclo}
              </Typography>
            ) : (
              <Typography fontSize="12px" textAlign="center" fontWeight="600" color="var(--color4)">
                {operation.obs}
              </Typography>
            )}
          </Box>
          <Box width="10%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography fontSize="16px" textAlign="center" fontWeight="600" color="var(--color4)">
              {operation.tipoOperation === '0'
                ? (operation.valor / operation.totalItemOperation).toFixed(1)
                : operation.qt}
            </Typography>
          </Box>

          <Box width="16%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography pr="5px" textAlign="end" fontSize="16px" fontWeight="600" color="var(--color4)">
              {formatCurrency(operation.valor, 'BRL')}
            </Typography>
          </Box>
          <Box
            width="16%"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            borderRight={`0.5px solid ${colors.grey[300]}`}
          >
            <Typography pr="5px" textAlign="end" fontSize="16px" fontWeight="600" color="var(--color4)">
              {formatCurrency(operation.totalItemOperation, 'BRL')}
            </Typography>
          </Box>
          <IconButton
            onClick={() => removeOperation(operation.uuid)}
            sx={{ color: 'red', position: 'absolute', right: '28px' }}
            aria-label="delete"
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemOperationCost;
