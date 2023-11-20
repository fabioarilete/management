import * as React from 'react';
import * as S from './Style';

type Props = {
  text: string;
  color: string;
  wSize: string;
  hSize: string;
  type: string;
};

export default function ButtonIcon({ type, wSize, hSize, color, text, ...props }: Props) {
  return (
    <>
      <S.Button color={color} wSize={wSize} hSize={hSize}></S.Button>
    </>
  );
}
