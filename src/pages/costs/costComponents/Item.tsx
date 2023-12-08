import { Box } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  width: string;
  borderLeft?: string;
  borderRight?: string;
  color?: string;
  bgcolor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: any;
  text?: any;
};

const Item = ({
  children,
  width,
  borderLeft,
  borderRight,
  color,
  bgcolor,
  fontSize,
  fontWeight,
  textAlign,
  text,
}: Props) => {
  return (
    <Box
      p="0px 5px 0px 5px"
      m="0"
      width={width}
      borderLeft={borderLeft}
      borderRight={borderRight}
      bgcolor={bgcolor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
    >
      {text}

      {children}
    </Box>
  );
};

export default Item;
