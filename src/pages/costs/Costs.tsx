import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { CostTypes } from './types/CostTypes';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import CostHeadTitle from './CostHeadTitle';
import CostItem from './CostItem';
import { CostProvider } from '../../contexts/CostContext';

const inicialCostState: CostTypes = {
  cod: '',
  name: '',
  unid: '',
  qt: '' as any,
  st: '',
  tipoProduto: '',
  sf_st: '',
  id: '',
  materialsProduct: [],
  operationsProduct: [],
  totalOperations: '' as any,
  totalMaterials: '' as any,
  markUpProduct: '' as any,
  informationsProduct: null,
  totalCost: '' as any,
  unitCost: '' as any,
  priceList: '' as any,
  mediumPrice: '' as any,
};

type Props = {};

const Costs = (props: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cost, setCost] = useState<CostTypes>(inicialCostState);
  const [costs, setCosts] = useState<any[]>([]);

  useEffect(() => {
    api
      .get('costs')
      .then(res => {
        setCosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleRemove(id: string) {
    api
      .delete(`costs/${id}`)
      .then(() => {
        setCosts(state => state.filter(cost => cost.id !== id));
      })
      .catch(err => console.log(err));
  }
  return (
    <CostProvider
      value={{
        cost,
        setCost,
        costs,
        setCosts,
        handleRemove,
      }}
    >
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" border={colors.greenAccent[500]}>
          <Header title="CUSTOS" subTitle="Lista dos custos cadastrados" />
          <Link to="/newCost">
            <Button
              type="button"
              sx={{ bgcolor: `${colors.greenAccent[500]}`, color: `${colors.grey[100]}`, height: '100%' }}
              variant="text"
            >
              Cadastrar Novo Custo
            </Button>
          </Link>
        </Box>
        <Box>
          <CostHeadTitle />
        </Box>
        <Box height="67vh" border={`1px solid ${colors.greenAccent[400]}`} borderRadius="5px" overflow="auto">
          {costs.map(cost => (
            <CostItem cost={cost} handleRemove={handleRemove} key={cost.id} />
          ))}
        </Box>
      </Box>
    </CostProvider>
  );
};

export default Costs;
