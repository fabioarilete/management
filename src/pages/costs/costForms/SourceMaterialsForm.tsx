import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { CostMaterial, CostTypes } from '../types/CostTypes';
import { MaterialTypes } from '../../materials/types/MaterialTypes';
import api from '../../../api/api';
import { Input } from '../../../components/form/input/Input';
import formatCurrency from '../../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';
import { SelectOptions } from '../../../components/form/selectOptions/SelectOptions';
import { Box, Typography, useTheme } from '@mui/material';
import Header from '../../../components/Header';
import { tokens } from '../../../theme';
import { Button } from '../../../components/form/button/Style';

interface CostTypesForm {
  cost: CostTypes;
  setCost: Dispatch<SetStateAction<CostTypes>>;
  handleValidation(cost: CostTypes): void;
  handleNextStep(step?: number): void;
  handleLastStep(step?: number): void;
}

const SourceMaterialsForm = ({ cost, setCost, handleNextStep, handleLastStep, handleValidation }: CostTypesForm) => {
  const [materials, setMaterials] = useState<MaterialTypes[]>([]);
  const [selectedMaterialId, setSelectMaterialId] = useState<string>();
  const [qt, setQt] = useState('');
  const [obs, setObs] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    api
      .get('materials')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const selectedMaterial = useMemo((): MaterialTypes | null => {
    if (!selectedMaterialId) {
      return null;
    }

    const material = materials.find(item => item.id === selectedMaterialId);

    if (!material) {
      return null;
    }

    return material;
  }, [selectedMaterialId, materials]);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!selectedMaterial) {
      return;
    }

    const totalItemMaterial = Number(qt) * selectedMaterial.total;

    const data: CostMaterial = {
      ...selectedMaterial,
      totalItemMaterial,
      qt,
      obs,
      uuid: uuidv4(),
    };

    setCost(state => ({
      ...state,
      materialsProduct: [...state.materialsProduct, data],
    }));
    setObs('');
    setQt('');
  }

  return (
    <Box
      overflow="auto"
      height="70vh"
      width="100%"
      display="flex"
      flexDirection="column"
      padding="10px"
      border={`1px solid ${colors.greenAccent[600]}`}
      borderRadius="5px"
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <Header title="ADIÇÃO DE MATERIAIS" subTitle="" />
        </Box>
        <SelectOptions
          value={selectedMaterialId}
          onChange={event => setSelectMaterialId(event.target.value)}
          label="Matéria-Prima"
        >
          {materials.map(item => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </SelectOptions>
        <br />
        <Box display="flex" justifyContent="center">
          <Typography>Preço do {selectedMaterial && selectedMaterial.unid}.....</Typography>
          {selectedMaterial && formatCurrency(selectedMaterial.total, 'BRL')}
        </Box>
        <br />
        <Input
          type="text"
          value={obs}
          label="Observação"
          name="obs"
          placeholder="Faça uma observação"
          onChange={event => setObs(event.currentTarget.value.toUpperCase())}
        />

        <Input
          type="number"
          value={qt}
          label="Quantidade"
          name="qt"
          placeholder="Informe a quantidade"
          onChange={event => setQt(event.currentTarget.value)}
        />

        <Box display="flex" justifyContent="space-around" margin="20px 0">
          <Button
            type="button"
            onClick={() => handleLastStep()}
            color={colors.greenAccent[600]}
            wSize="30%"
            hSize="55px"
          >
            <Typography color={colors.grey[100]}>VOLTAR</Typography>
          </Button>
          <Button type="submit" onClick={handleSubmit} color={colors.greenAccent[600]} wSize="30%" hSize="55px">
            <Typography color={colors.grey[100]}>ADD + MATERIAIS</Typography>
          </Button>
          <Button
            type="button"
            onClick={() => handleNextStep()}
            color={colors.greenAccent[600]}
            wSize="30%"
            hSize="55px"
          >
            <Typography color={colors.grey[100]}>ADICIONAR OPERAÇÕES</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SourceMaterialsForm;
