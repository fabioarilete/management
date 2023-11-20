import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';

type Props = {
  children: ReactNode;
};

const ModalComponent = ({ children }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      zIndex="2000"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      right="0"
      left="0"
      top="0"
      bottom="0"
      position="fixed"
      bgcolor="rgb(0,0,0,0.5)"
    >
      <Box
        bgcolor={colors.primary[400]}
        border={`0.2px solid ${colors.greenAccent[600]}`}
        borderRadius="5px"
        display="flex"
        flexDirection="column"
        width="40%"
        height="70%"
        p="10px"
        overflow="auto"
        boxShadow={`2px 2px 2px ${colors.grey[400]}`}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ModalComponent;
