import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';

type Props = {
  title: string;
  value: string;
};

const ItemCostCard = ({ title, value }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography fontSize="18px" color={colors.grey[100]}>
        {title}:
      </Typography>
      <Typography fontSize="18px" fontWeight="bold" color={colors.grey[100]}>
        {value}
      </Typography>
    </Box>
  );
};

export default ItemCostCard;
