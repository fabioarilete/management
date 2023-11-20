import React, { InputHTMLAttributes, forwardRef } from 'react';
import * as S from './Style';
import { tokens } from '../../../theme';
import { useTheme } from '@mui/material';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', name = '', label = '', ...props }, ref) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <S.ContainerInput>
        <S.Label color={colors.grey[100]} htmlFor={name}>
          {label}
        </S.Label>
        <S.Input color={colors.blueAccent[700]} type={type} name={name} ref={ref} {...props} />
      </S.ContainerInput>
    );
  },
);
