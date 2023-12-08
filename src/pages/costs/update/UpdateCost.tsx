import React from 'react';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import HeaderCost from '../costComponents/HeaderCost';
import MaterialsCost from '../costComponents/MaterialsCost';
import OperationsCost from '../costComponents/OperationsCost';
import MarkUpCost from '../costComponents/MarkUpCost';
import ResultsCost from '../costComponents/ResultsCost';
import { CostProvider, useCosts } from '../../../contexts/CostContext';
import { useFetchCost } from '../../../hooks/useFetchCosts';

const UpdateCost = () => {
  const { id } = useParams<{ id: string }>();
  const { cost } = useFetchCost(id);
  const { setCost, setCosts } = useCosts();

  console.log(cost?.operationsProduct);

  function handleRemove() {}
  function removeMaterial() {}
  function removeOperation() {}

  return (
    <CostProvider
      value={{
        cost,
        setCost,
        setCosts,
        handleRemove,
      }}
    >
      {cost && (
        <Box width="90%" m="auto" padding="10px">
          <Box width="100%" padding="20px 30px 20px 15px" bgcolor="#fff" borderRadius="5px" justifyContent="end">
            <Box width="100%" display="flex">
              <HeaderCost hasEdition cost={cost} handleRemove={handleRemove} />
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
      )}
    </CostProvider>
  );
};

export default UpdateCost;
