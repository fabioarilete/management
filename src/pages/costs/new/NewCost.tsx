import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CostTypes } from '../types/CostTypes';
import { CostProvider, useCosts } from '../../../contexts/CostContext';
import { Box } from '@mui/material';
import api from '../../../api/api';
import Header from '../../../components/Header';
import HeaderForm from '../costForms/HeaderForm';
import SourceMaterialsForm from '../costForms/SourceMaterialsForm';
import SourceOperationsForm from '../costForms/SourceOperationsForm';
import HeaderCost from '../costComponents/HeaderCost';
import MaterialsCost from '../costComponents/MaterialsCost';
import OperationsCost from '../costComponents/OperationsCost';
import ResultsCost from '../costComponents/ResultsCost';
import MarkUpCost from '../costComponents/MarkUpCost';

const inicialCostState: CostTypes = {
  cod: '',
  name: '',
  unid: '',
  qt: '' as any,
  st: '',
  tipoProduto: '',
  sf_st: '',
  id: '' as any,
  materialsProduct: [],
  operationsProduct: [],
  totalOperations: '' as any,
  totalMaterials: '' as any,
  markUpProduct: null,
  informationsProduct: null,
  totalCost: '' as any,
  unitCost: '' as any,
  priceList: '' as any,
  mediumPrice: '' as any,
};

const NewCost = () => {
  const [cost, setCost] = useState<CostTypes>(inicialCostState);
  const { costs, setCosts } = useCosts();
  const [step, setStep] = useState(1);

  useEffect(() => {
    let total = 0;

    if (!cost.operationsProduct.length) {
      total = 0;
    }
    total = cost.operationsProduct.reduce((next, item) => {
      const subTotal = item.totalItemOperation;
      return next + subTotal;
    }, 0);

    setCost(state => ({
      ...state,
      totalOperations: total,
    }));
  }, [cost.operationsProduct]);

  useEffect(() => {
    let total = 0;

    if (!cost.materialsProduct.length) {
      total = 0;
    }
    total = cost.materialsProduct.reduce((next, item) => {
      const subTotal = item.totalItemMaterial;
      return next + subTotal;
    }, 0);

    setCost(state => ({
      ...state,
      totalMaterials: total,
    }));
  }, [cost.materialsProduct]);

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
    const operationsProduct = cost.operationsProduct.filter(item => item.uuid !== operationUuid);
    setCost(state => ({
      ...state,
      operationsProduct,
    }));
  }

  function removeMaterial(materialUuid: string) {
    const materialsProduct = cost.materialsProduct.filter(item => item.uuid !== materialUuid);
    setCost(state => ({
      ...state,
      materialsProduct,
    }));
  }

  function editMaterial() {
    
  }

  function handleRemove() {}

  function addCost(cost: CostTypes) {
    const data = {
      ...cost,
      materialsProduct: cost.materialsProduct.map(material => ({
        id: material.id,
        qt: material.qt,
        obs: material.obs,
        totalItemmaterial: material.totalItemMaterial,
      })),
      operationsProduct: cost.operationsProduct.map(operation => ({
        id: operation.id,
        obs: operation.obs,
        qt: operation.qt,
        cav: operation.cav,
        ciclo: operation.ciclo,
        totalItemOperation: operation.totalItemOperation,
      })),
      informationsProduct: {
        cod: cost.informationsProduct?.cod,
        tabela: cost.informationsProduct?.tabela,
        precoMedio: cost.informationsProduct?.precoMedio,
      },
      markUpProduct: {
        id: cost.markUpProduct?.id,
      },
    };
    api
      .post('costs', data)
      .then(res => {
        setCosts(state => [...state, { ...cost, id: res.data.id }]);
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
            <Box width="100%" display="flex">
              <MarkUpCost cost={cost} />
              <ResultsCost cost={cost} />
            </Box>
          </Box>
        </Box>
      </Box>
    </CostProvider>
  );
};

export default NewCost;
