import React, { InputHTMLAttributes, forwardRef } from 'react';
import * as S from './Style';
import { tokens } from '../../../theme';
import { Typography, useTheme } from '@mui/material';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const RadioButton = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'radio', name = '', label = '', ...props }, ref) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <S.Container>
        <S.Label color={colors.grey[100]} htmlFor={name}>
          <Typography fontSize="18px" color={colors.grey[100]}>
            {label}
          </Typography>
        </S.Label>
        <S.Input type={type} name={name} ref={ref} {...props} />
      </S.Container>
    );
  },
);
