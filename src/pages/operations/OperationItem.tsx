import React from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import { OperationTypes } from './types/OperationTypes';
import formatCurrency from '../../utils/formatCurrency';
import { tokens } from '../../theme';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useOperations } from '../../contexts/OperationContext';

type Props = {
  handleRemove(id: number): void;
  operation: OperationTypes;
};

const OperationItem = ({ operation, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSelectedOperation } = useOperations();

  function editMaterial() {
    setSelectedOperation(operation);
  }
  function handleRemoveClick() {
    handleRemove(operation.id);
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
      width="98%"
      alignItems="center"
    >
      <Box width="54%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography color={colors.greenAccent[400]}>{operation.name}</Typography>
      </Box>
      <Box width="18%" textAlign="center" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography>{operation.tipoOperation === '1' ? 'Comum' : 'Injeção'}</Typography>
      </Box>
      <Box width="18%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">
          {formatCurrency(operation.valor, 'BRL')} {operation.unid}
        </Typography>
      </Box>

      <Box width="10%" display="flex" justifyContent="center" alignItems="center">
        <IconButton onClick={editMaterial} sx={{ color: colors.grey[100] }} aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleRemoveClick} sx={{ color: colors.grey[100] }} aria-label="delete">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default OperationItem;
