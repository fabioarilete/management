import { Box, Typography, useTheme } from '@mui/material';
import Logo from '../../../assets/logosf.png';
import { CostTypes } from '../types/CostTypes';
import { tokens } from '../../../theme';

type Props = {
  handleRemove(id: number): void;
  cost: CostTypes;
};

const HeaderCost = ({ cost, handleRemove }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" display="flex" flexDirection="column" p="10px">
      <Box width="100%" justifyContent="space-around" display="flex">
        <Box
          width="33%"
          height="120px"
          m="5px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <img style={{ margin: '10px', width: '200px' }} src={Logo} alt="" />
          <Typography fontSize="14px" fontWeight="bold" color="#000">
            Planilha de Custo de Produto
          </Typography>
        </Box>
        <Box
          width="33%"
          height="120px"
          m="5px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          border={`1px solid ${colors.grey[200]}`}
          borderRadius="5px"
        ></Box>
        <Box
          width="33%"
          height="120px"
          m="5px"
          p="5px"
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          alignItems="start"
        >
          <Box display="flex" alignItems="center">
            <Typography color="var(--color4)" fontWeight="bold" ml="10px">
              Quant. Embalagem:
            </Typography>
            <Typography color="var(--color10)" fontSize="18px" fontWeight="bold" ml="20px">
              {cost.qt}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography color="var(--color4)" fontWeight="bold" ml="10px">
              Sub. Tributária:
            </Typography>
            <Typography color="var(--color10)" fontSize="18px" fontWeight="bold" ml="20px">
              {cost.st === '0' ? 'Não' : 'Sim'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography color="var(--color4)" fontWeight="bold" ml="10px">
              SFCO x STTE:
            </Typography>
            <Typography color="var(--color10)" fontSize="18px" fontWeight="bold" ml="20px">
              {cost.sf_st === '0' ? 'Não' : 'Sim'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography color="var(--color4)" fontWeight="bold" ml="10px">
              Tipo Produto:
            </Typography>
            <Typography color="var(--color10)" fontSize="18px" fontWeight="bold" ml="20px">
              {cost.tipoProduto === '0' ? 'Revenda' : 'Produzido'}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" mt="10px">
        <Box display="flex" width="100%">
          <Box width="20%" textAlign="center" bgcolor="var(--color4)">
            <Typography color="#fff" fontSize="16px" fontWeight="bold">
              Código
            </Typography>
          </Box>
          <Box width="80%" textAlign="center" bgcolor="var(--color4)">
            <Typography color="#fff" fontSize="16px" fontWeight="bold">
              Descrição do Produto
            </Typography>
          </Box>
        </Box>
        <Box display="flex" width="100%">
          <Box
            width="20%"
            textAlign="center"
            borderLeft={`8px solid var(--color4)`}
            borderBottom={`1px solid var(--color8)`}
          >
            <Typography color="var(--color4)" fontSize="16px" fontWeight="bold">
              {cost.cod}
            </Typography>
          </Box>
          <Box
            width="80%"
            textAlign="center"
            borderLeft={`0.5px solid var(--color8)`}
            borderRight={`0.5px solid var(--color8)`}
            borderBottom={`1px solid var(--color8)`}
          >
            <Typography color="var(--color4)" fontSize="16px" fontWeight="bold">
              {cost.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderCost;
