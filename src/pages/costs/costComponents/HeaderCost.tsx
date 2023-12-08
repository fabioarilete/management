import { Box, IconButton, Typography, useTheme } from '@mui/material';
import Logo from '../../../assets/logosf.png';
import { CostTypes } from '../types/CostTypes';
import { tokens } from '../../../theme';
import ItemInformationCost from './ItemInformationCost';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Item from './Item';

type Props = {
  handleRemove(id: number): void;
  cost: CostTypes;
  hasEdition?: boolean;
};

const HeaderCost = ({ cost, handleRemove, hasEdition = false }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box width="100%" display="flex" flexDirection="column" p="5px">
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
          <ItemInformationCost title="Quant. Embalagem:" content={cost.qt} />
          <ItemInformationCost title="Sub. Tributária:" content={cost.st === '0' ? 'Não' : 'Sim'} />
          <ItemInformationCost title="Sfco x Stte:" content={cost.sf_st === '0' ? 'Não' : 'Sim'} />
          <ItemInformationCost title="Tipo Produto:" content={cost.tipoProduto === '0' ? 'Revenda' : 'Produzido'} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" width="100%" mt="10px">
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="center"
          bgcolor="var(--color4)"
          color="#fff"
          textAlign="center"
        >
          <Item width="20%" fontSize="18px" fontWeight="bold" color="#fff" text="Código" />
          <Item width="72%" fontSize="18px" fontWeight="bold" color="#fff" text="Descrição do Produto" />
          <Item width="8%" fontSize="18px" fontWeight="bold" color="#fff" text="" />
        </Box>
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="flex-end"
          textAlign="center"
          border={`0.5px solid ${colors.grey[300]}`}
        >
          <Item
            width="20%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="center"
            borderRight={`0.5px solid ${colors.grey[300]}`}
            text={cost.cod}
          />
          <Item
            width="72%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="center"
            text={cost.name}
          />
          <Box width="8%" display="flex" justifyContent="center">
            {hasEdition && (
              <IconButton sx={{ color: 'var(--color4)' }} aria-label="edit">
                <EditOutlinedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderCost;
