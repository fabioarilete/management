import * as S from './Style';
import React, { ReactNode, SelectHTMLAttributes } from 'react';
import { tokens } from '../../../theme';
import { useTheme } from '@mui/material';

interface SelectoptionsProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  label?: string;
}

export const SelectOptions: React.FC<SelectoptionsProps> = ({ value, children, name, label, ...rest }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <S.ContainerSelect>
      <S.Label color={colors.grey[100]} htmlFor={name}>
        {label}
      </S.Label>
      <S.Select {...rest} id={name} value={value || ''} color={colors.blueAccent[700]} {...rest} name={name}>
        <option>Selecione uma opção</option>
        {children}
      </S.Select>
    </S.ContainerSelect>
  );
};
