import React from 'react';
import { CostOperation } from '../types/CostTypes';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Item from './Item';

type Props = {
  removeOperation(id: string): void;
  operation: CostOperation;
  hasEdition?: boolean;
};

const ItemOperationCost = ({ operation, removeOperation, hasEdition = false }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexDirection="column">
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="flex-end"
          textAlign="center"
          border={`0.5px solid ${colors.grey[300]}`}
        >
          <Item
            width="33%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="start"
            borderRight={`0.5px solid ${colors.grey[300]}`}
            text={operation.name}
          />
          {operation.tipoOperation === '0' ? (
            <Item
              width="23%"
              color="var(--color4)"
              fontSize="12px"
              fontWeight="600"
              textAlign="center"
              text={`${operation.obs} - Cav: ${operation.cav} - Ciclo: ${operation.ciclo}`}
            />
          ) : (
            <Item
              width="23%"
              color="var(--color4)"
              fontSize="12px"
              fontWeight="600"
              textAlign="center"
              text={operation.obs}
            />
          )}
          {operation.tipoOperation === '0' ? (
            <Item
              width="10%"
              color="var(--color4)"
              fontSize="18px"
              fontWeight="600"
              textAlign="center"
              borderLeft={`0.5px solid ${colors.grey[300]}`}
              text={(operation.valor / operation.totalItemOperation).toFixed(1)}
            />
          ) : (
            <Item
              width="10%"
              color="var(--color4)"
              fontSize="18px"
              fontWeight="600"
              textAlign="center"
              borderLeft={`0.5px solid ${colors.grey[300]}`}
              text={operation.qt}
            />
          )}
          <Item
            width="13%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="end"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            text={formatCurrency(operation.valor, 'BRL')}
          />
          <Item
            width="13%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="end"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            borderRight={`0.5px solid ${colors.grey[300]}`}
            text={formatCurrency(operation.totalItemOperation, 'BRL')}
          />
          <Box width="8%" display="flex" justifyContent="space-around">
            {hasEdition && (
              <IconButton sx={{ color: 'var(--color4)' }} aria-label="edit">
                <EditOutlinedIcon />
              </IconButton>
            )}
            <IconButton onClick={() => removeOperation(operation.uuid)} sx={{ color: 'red' }} aria-label="delete">
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemOperationCost;
