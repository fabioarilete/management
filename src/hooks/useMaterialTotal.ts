import { useMemo } from 'react';
import { MaterialTypes } from '../pages/materials/types/MaterialTypes';

export function useMaterialTotal(material: MaterialTypes): number {
  const total = useMemo(() => {
    const valorFrete = material.preco * (material.frete / 100);

    let valorIcms = 0;

    if (material.tipoFornecedor === '0') {
      valorIcms = material.preco * (material.nf / 100) * (material.icms / 100);
    }

    return material.preco - valorIcms + valorFrete;
  }, [material]);

  return total;
}
