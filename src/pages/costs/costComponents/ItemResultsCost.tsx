import React from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box, Typography } from '@mui/material';

type Props = {
  cost: CostTypes;
  value: string;
  description: string;
  descriptionFontColor: string;
  descriptionBgColor: string;
  valueBorderColor: string;
  valueFontColor: string;
};

const ItemResultsCost = ({
  cost,
  value,
  description,
  descriptionFontColor,
  descriptionBgColor,
  valueBorderColor,
  valueFontColor,
}: Props) => {
  return (
    <Box display="flex" flex="0.70" m="0 15px 5px 0" flexDirection="column">
      <Box display="flex" width="100%" justifyContent="flex-end" m="5px">
        <Box
          width="60%"
          height="35px"
          textAlign="right"
          bgcolor={descriptionBgColor}
          pr="15px"
          borderRadius="20px 0 0 20px"
        >
          <Typography color={descriptionFontColor} fontWeight="bold" fontSize="22px">
            {description}
          </Typography>
        </Box>
        <Box width="40%" height="35px" textAlign="right" pr="15px" border={`2px solid ${valueBorderColor}`}>
          <Typography color={valueFontColor} fontWeight="bold" fontSize="22px">
            {value}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemResultsCost;
