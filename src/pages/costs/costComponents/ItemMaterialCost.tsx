import React from 'react';
import { CostMaterial } from '../types/CostTypes';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import formatCurrency from '../../../utils/formatCurrency';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

type Props = {
  removeMaterial(materialUuid: string): void;
  material: CostMaterial;
};

const ItemMaterialCost = ({ material, removeMaterial }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexDirection="column">
        <Box width="100%" display="flex" alignItems="center" borderBottom={`0.5px solid ${colors.grey[300]}`}>
          <Box width="35%" borderLeft={`8px solid #1E5245`}>
            <Typography pl="5px" textAlign="start" fontSize="16px" fontWeight="600" color="var(--color4)">
              {material.name}
            </Typography>
          </Box>
          <Box width="17%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography fontSize="12px" textAlign="center" fontWeight="600" color="var(--color4)">
              {material.obs}
            </Typography>
          </Box>
          <Box width="10%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography fontSize="16px" textAlign="center" fontWeight="600" color="var(--color4)">
              {material.qt}
            </Typography>
          </Box>
          <Box width="6%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography fontSize="16px" textAlign="center" fontWeight="600" color="var(--color4)">
              {material.unid}
            </Typography>
          </Box>
          <Box width="16%" borderLeft={`0.5px solid ${colors.grey[300]}`}>
            <Typography pr="5px" textAlign="end" fontSize="16px" fontWeight="600" color="var(--color4)">
              {formatCurrency(material.total, 'BRL')}
            </Typography>
          </Box>
          <Box
            width="16%"
            borderLeft={`0.5px solid ${colors.grey[300]}`}
            borderRight={`0.5px solid ${colors.grey[300]}`}
          >
            <Typography pr="5px" textAlign="end" fontSize="16px" fontWeight="600" color="var(--color4)">
              {formatCurrency(material.totalItemMaterial, 'BRL')}
            </Typography>
          </Box>

          <IconButton
            onClick={() => removeMaterial(material.uuid)}
            sx={{ color: 'red', position: 'absolute', right: '25px' }}
            aria-label="delete"
          >
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ItemMaterialCost;
