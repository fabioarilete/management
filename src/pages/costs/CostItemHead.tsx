import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

type Props = {
  width: string;
  title: string;
};

const CostItemHead = ({ width, title }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width={width}
      borderRight={`1px solid ${colors.grey[400]}`}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography>{title}</Typography>
    </Box>
  );
};

export default CostItemHead;
