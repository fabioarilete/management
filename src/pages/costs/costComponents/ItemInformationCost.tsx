import { Box, Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
  content: string;
};

const ItemInformationCost = ({ title, content }: Props) => {
  return (
    <Box display="flex" width="100%" alignItems="center" justifyContent="end">
      <Typography color="var(--color4)" fontSize="20px" fontWeight="600" ml="10px">
        {title}
      </Typography>
      <Typography color="var(--color10)" fontSize="20px" fontWeight="bold" ml="20px">
        {content}
      </Typography>
    </Box>
  );
};

export default ItemInformationCost;
