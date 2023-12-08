import { Box } from '@mui/material';
import ItemMarkUpCost from './ItemMarkUpCost';
import { CostTypes } from '../types/CostTypes';

type Props = {
  cost: CostTypes;
};

const MarkUpCost = ({ cost }: Props) => {
  return (
    <Box display="flex" flex="0.20" m="10px" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        m="10px"
        p="10px"
        bgcolor="#fefefe"
        borderRadius="5px"
        border={`1px solid var(--color4)`}
      >
        <ItemMarkUpCost cost={cost} description="" valor={`${cost.markUpProduct?.name}`} />
        <br />
        <ItemMarkUpCost cost={cost} description="Impostos:" valor={`${cost.markUpProduct?.impostos} %`} />
        <ItemMarkUpCost cost={cost} description="Comissão:" valor={`${cost.markUpProduct?.comissao} %`} />
        <ItemMarkUpCost cost={cost} description="Administração:" valor={`${cost.markUpProduct?.adm} %`} />
        <ItemMarkUpCost cost={cost} description="Frete:" valor={`${cost.markUpProduct?.frete} %`} />
        <ItemMarkUpCost cost={cost} description="Financeiro:" valor={`${cost.markUpProduct?.financeiro} %`} />
        <ItemMarkUpCost cost={cost} description="Marketing:" valor={`${cost.markUpProduct?.marketing} %`} />
        <ItemMarkUpCost cost={cost} description="Promotores:" valor={`${cost.markUpProduct?.promotores} %`} />
        <ItemMarkUpCost cost={cost} description="Bonificações:" valor={`${cost.markUpProduct?.bonificacoes} %`} />
        <ItemMarkUpCost cost={cost} description="Lucro:" valor={`${cost.markUpProduct?.lucro} %`} />
        <br />
        <ItemMarkUpCost
          cost={cost}
          description="Coeficiente:"
          valor={`${cost.markUpProduct?.coeficiente.toFixed(2)}`}
        />
      </Box>
    </Box>
  );
};

export default MarkUpCost;
