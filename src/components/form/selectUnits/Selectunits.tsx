import * as S from './Style';
import { InputHTMLAttributes, FC } from 'react';
import { tokens } from '../../../theme';
import { useTheme } from '@mui/material';

type InputProps = InputHTMLAttributes<HTMLSelectElement> & {
  label?: string;
};

export const SelectUnits: FC<InputProps> = ({ name, label, ...rest }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <S.ContainerSelect>
      <S.Label color={colors.grey[100]} htmlFor={name}>
        {label}
      </S.Label>
      <S.Select color={colors.blueAccent[700]} {...rest} name={name}>
        <option>Selecione uma opção</option>
        <option>UN</option>
        <option>KG</option>
        <option>DZ</option>
        <option>CX</option>
        <option>PCT</option>
        <option>HR</option>
        <option>LT</option>
        <option>FD</option>
        <option>FX</option>
        <option>M2</option>
        <option>M3</option>
      </S.Select>
    </S.ContainerSelect>
  );
};
