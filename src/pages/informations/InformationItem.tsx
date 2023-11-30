import React from 'react';
import { Box, Typography, useTheme, IconButton } from '@mui/material';
import formatCurrency from '../../utils/formatCurrency';
import { tokens } from '../../theme';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { InformationsTypes } from './types/InformationsType';
import { useInformations } from '../../contexts/InformationContext';

type Props = {
  handleRemove(id: string): void;
  information: InformationsTypes;
};

const InformationItem = ({ information, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSelectedInformation } = useInformations();

  function editInformation() {
    setSelectedInformation(information);
  }
  function handleRemoveClick() {
    handleRemove(information.id);
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
      <Box width="7%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography color={colors.greenAccent[400]}>{information.cod}</Typography>
      </Box>
      <Box width="50%" textAlign="left" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography color={colors.greenAccent[400]}>{information.name}</Typography>
      </Box>

      <Box width="12%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(information.tabela, 'BRL')}</Typography>
      </Box>
      <Box width="12%" textAlign="right" borderRight={`1px solid ${colors.grey[400]}`}>
        <Typography marginRight="5px">{formatCurrency(information.precoMedio, 'BRL')}</Typography>
      </Box>

      <Box width="12%" display="flex" justifyContent="space-around" alignItems="center">
        <IconButton onClick={editInformation} sx={{ color: colors.grey[100] }} aria-label="edit">
          <EditOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleRemoveClick} sx={{ color: colors.grey[100] }} aria-label="delete">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InformationItem;
