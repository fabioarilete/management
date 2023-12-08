import React from 'react';
import { CostMaterial } from '../types/CostTypes';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Item from './Item';

type Props = {
  removeMaterial(materialUuid: string): void;
  material: CostMaterial;
  hasEdition?: boolean;
};

const ItemMaterialCost = ({ material, removeMaterial, hasEdition = false }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexDirection="column">
        <Box
          width="100%"
          height="35px"
          display="flex"
          alignItems="flex-end"
          textAlign="center"
          border={`0.5px solid ${colors.grey[300]}`}
        >
          <Item
            width="33%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="start"
            borderRight={`0.5px solid ${colors.grey[300]}`}
            text={material.name}
          />
          <Item
            width="17%"
            color="var(--color4)"
            fontSize="12px"
            fontWeight="600"
            textAlign="center"
            text={material.obs}
          />
          <Item
            width="10%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="center"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            text={material.qt}
          />
          <Item
            width="6%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="center"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            text={material.unid}
          />
          <Item
            width="13%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="end"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            text={formatCurrency(material.total, 'BRL')}
          />
          <Item
            width="13%"
            color="var(--color4)"
            fontSize="18px"
            fontWeight="600"
            textAlign="end"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            borderRight={`0.5px solid ${colors.grey[300]}`}
            text={formatCurrency(material.totalItemMaterial, 'BRL')}
          />
          <Box width="8%" display="flex" justifyContent="space-around">
            {hasEdition && (
              <IconButton sx={{ color: 'var(--color4)' }} aria-label="edit">
                <EditOutlinedIcon />
              </IconButton>
            )}
            <IconButton onClick={() => removeMaterial(material.uuid)} sx={{ color: 'red' }} aria-label="delete">
              <DeleteForeverOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemMaterialCost;
