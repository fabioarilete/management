import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CostTypes } from '../types/CostTypes';
import { CostProvider, useCosts } from '../../../contexts/CostContext';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import api from '../../../api/api';
import Header from '../../../components/Header';
import HeaderForm from '../costForms/HeaderForm';
import SourceMaterialsForm from '../costForms/SourceMaterialsForm';
import SourceOperationsForm from '../costForms/SourceOperationsForm';
import HeaderCost from '../costComponents/HeaderCost';
import MaterialsCost from '../costComponents/MaterialsCost';
import OperationsCost from '../costComponents/OperationsCost';

const inicialCostState: CostTypes = {
  cod: '',
  name: '',
  unid: '',
  qt: '' as any,
  st: '',
  tipoProduto: '',
  sf_st: '',
  id: '' as any,
  materiaisProduto: [],
  operacoesProduto: [],
  totalOperations: '' as any,
  totalMaterials: '' as any,
  markUpProduct: null,
  infoProduct: null,
  totalCost: '' as any,
  unitCost: '' as any,
  priceList: '' as any,
  mediumPrice: '' as any,
};

const NewCost = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cost, setCost] = useState<CostTypes>(inicialCostState);
  const { costs, setCosts } = useCosts();
  const [step, setStep] = useState(1);

  useEffect(() => {
    let total = 0;

    if (!cost.operacoesProduto.length) {
      total = 0;
    }
    total = cost.operacoesProduto.reduce((next, item) => {
      const subTotal = item.totalItemOperation;
      return next + subTotal;
    }, 0);

    setCost(state => ({
      ...state,
      totalOperations: total,
    }));
  }, [cost.operacoesProduto]);

  useEffect(() => {
    let total = 0;

    if (!cost.materiaisProduto.length) {
      total = 0;
    }
    total = cost.materiaisProduto.reduce((next, item) => {
      const subTotal = item.totalItemMaterial;
      return next + subTotal;
    }, 0);

    setCost(state => ({
      ...state,
      totalMaterials: total,
    }));
  }, [cost.materiaisProduto]);

  useEffect(() => {
    let total = 0;

    if (!cost.totalMaterials && !cost.totalOperations) {
      total = 0;
    }
    total = Number(cost.totalMaterials) + Number(cost.totalOperations);

    let unitCost = 0;
    if (!total) {
      unitCost = 0;
    }

    unitCost = total / Number(cost.qt);

    setCost(state => ({
      ...state,
      totalCost: total,
      unitCost,
    }));
  }, [cost.totalMaterials, cost.totalOperations, cost.qt]);

  function handleValidation() {}

  function handleNextStep(step?: number) {
    if (step) {
      setStep(step);
      return;
    }
    setStep(state => state + 1);
  }

  function handleLastStep(step?: number) {
    if (step) {
      setStep(step);
      return;
    }
    setStep(state => state - 1);
  }

  function removeOperation(operationUuid: string) {
    const operacoesProduto = cost.operacoesProduto.filter(item => item.uuid !== operationUuid);
    setCost(state => ({
      ...state,
      operacoesProduto,
    }));
  }

  function removeMaterial(materialUuid: string) {
    const materiaisProduto = cost.materiaisProduto.filter(item => item.uuid !== materialUuid);
    setCost(state => ({
      ...state,
      materiaisProduto,
    }));
  }

  function handleRemove() {}

  function addCost(cost: CostTypes) {
    const data = { ...cost };
    api
      .post('products', data)
      .then(res => {
        setCosts(state => [...state, { ...data, id: res.data.id }]);
      })
      .catch(err => console.log(err));
  }

  function handleSubmit(cost: CostTypes) {
    addCost(cost);
    toast.success('Custo cadastrado com sucesso!');
  }

  return (
    <CostProvider
      value={{
        step,
        setStep,
        handleNextStep,
        handleLastStep,
        cost,
        setCost,
        costs,
        setCosts,
        handleRemove,
      }}
    >
      <Box display="flex" flexDirection="row" m="20px">
        <Box width="30%" flexDirection="column">
          <Header title="PLANILHA DE CUSTO" subTitle="Elabore o custo do seu produto" />
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {step === 1 ? (
              <HeaderForm
                handleNextStep={handleNextStep}
                cost={cost}
                setCost={setCost}
                handleValidation={handleValidation}
              />
            ) : step === 2 ? (
              <SourceMaterialsForm
                handleLastStep={handleLastStep}
                handleNextStep={handleNextStep}
                cost={cost}
                setCost={setCost}
                handleValidation={handleValidation}
              />
            ) : (
              step === 3 && (
                <SourceOperationsForm
                  handleLastStep={handleLastStep}
                  cost={cost}
                  setCost={setCost}
                  handleValidation={handleValidation}
                  handleSubmit={handleSubmit}
                />
              )
            )}
          </Box>
        </Box>
        <Box width="70%" padding="10px">
          <Box width="100%" padding="15px 0" bgcolor="#fff" borderRadius="5px" justifyContent="end">
            <Box width="100%" display="flex">
              <HeaderCost cost={cost} handleRemove={handleRemove} />
            </Box>
            <Box width="100%" display="flex">
              <MaterialsCost cost={cost} removeMaterial={removeMaterial} />
            </Box>
            <Box width="100%" display="flex">
              <OperationsCost cost={cost} removeOperation={removeOperation} />
            </Box>
          </Box>
        </Box>
      </Box>
    </CostProvider>
  );
};

export default NewCost;
