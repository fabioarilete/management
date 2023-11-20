import { useMemo } from 'react';
import { MarkUpTypes } from '../pages/markUps/types/MarkUpTypes';

export function UseMarkUpCoef(markUp: MarkUpTypes): number {
  const coef = useMemo(() => {
    const encargos =
      Number(markUp.impostos) +
      Number(markUp.comissao) +
      Number(markUp.frete) +
      Number(markUp.adm) +
      Number(markUp.financeiro) +
      Number(markUp.marketing) +
      Number(markUp.promotores) +
      Number(markUp.bonificacoes) +
      Number(markUp.lucro);

    return 100 / (100 - encargos);
  }, [markUp]);

  return coef;
}
