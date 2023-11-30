import React from 'react';
import { Box, Typography } from '@mui/material';
import { CostTypes } from '../types/CostTypes';

type Props = {
  cost: CostTypes;
  valor: string;
  description: string;
};

const ItemMarkUpCost = ({ cost, valor, description }: Props) => {
  return (
    <Box mb="5px" display="flex" justifyContent="end">
      <Typography fontSize="18px" color="var(--color4)">
        {description}
      </Typography>
      <Typography ml="15px" fontSize="18px" fontWeight="bold" color="var(--color4)">
        {valor}
      </Typography>
    </Box>
  );
};

export default ItemMarkUpCost;
