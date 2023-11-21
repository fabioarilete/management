import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { CostTypes } from '../types/CostTypes';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { useFetchInfo } from '../../../hooks/useFetchInfo';
import { useFetchMarkUps } from '../../../hooks/useFetchMarkUps';
import { InfoTypes } from '../types/InfoTypes';
import { MarkUpTypes } from '../../markUps/types/MarkUpTypes';
import Header from '../../../components/Header';
import { Input } from '../../../components/form/input/Input';
import { SelectUnits } from '../../../components/form/selectUnits/Selectunits';
import { RadioButton } from '../../../components/form/radioButton/RadioButton';
import { SelectOptions } from '../../../components/form/selectOptions/SelectOptions';
import { Button } from '../../../components/form/button/Style';

interface CostFormProps {
  cost: CostTypes;
  setCost: Dispatch<SetStateAction<CostTypes>>;
  handleValidation(cost: CostTypes): void;
  handleNextStep(step?: number): void;
}

const HeaderForm = ({ cost, setCost, handleValidation, handleNextStep }: CostFormProps) => {
  const [selectedMarkUpId, setSelectedMarkUpId] = useState<string>();
  const { markUps, loading, error } = useFetchMarkUps();
  const { informations } = useFetchInfo();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const selectedProduct = useMemo((): InfoTypes | null => {
    if (!cost.cod) {
      return null;
    }

    const product = informations.find(item => item.cod === Number(cost.cod));

    if (!product) {
      return null;
    }

    return product;
  }, [cost.cod, informations]);

  const selectedMarkUp = useMemo((): MarkUpTypes | null => {
    if (!selectedMarkUpId) {
      return null;
    }

    const markUp = markUps.find(item => item.id === parseInt(selectedMarkUpId));

    if (!markUp) {
      return null;
    }

    return markUp;
  }, [selectedMarkUpId, markUps]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setCost(state => ({
      ...state,
      markUpProduct: selectedMarkUp,
      infoProduct: selectedProduct,
    }));
    handleNextStep();
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
          <Header title="INFORMAÇÕES INICIAIS " subTitle="" />
        </Box>
        <Input
          type="text"
          value={cost.cod}
          label="Cód"
          name="cod"
          placeholder="Informe o cód. do produto"
          onChange={event =>
            setCost({
              ...cost,
              cod: event.currentTarget.value,
            })
          }
        />
        <Input
          type="text"
          value={cost.name}
          label="Produto"
          name="name"
          placeholder="Descreva o produto"
          onChange={event =>
            setCost({
              ...cost,
              name: event.currentTarget.value.toUpperCase(),
            })
          }
        />

        <SelectUnits
          label="Unidade"
          name="unid"
          value={cost.unid}
          onChange={event =>
            setCost({
              ...cost,
              unid: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={cost.qt}
          label="Quant. na Embalagem"
          name="qt"
          placeholder="Informe a quantidade"
          onChange={event =>
            setCost({
              ...cost,
              qt: event.currentTarget.value,
            })
          }
        />
        <SelectOptions
          value={selectedMarkUpId}
          onChange={event => setSelectedMarkUpId(event.target.value)}
          label="Mark Up"
        >
          {markUps.map(item => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </SelectOptions>

        <Typography color={colors.grey[100]}> Tipo de Produto</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          border={`1px solid ${colors.grey[100]}`}
          bgcolor={colors.blueAccent[700]}
        >
          <RadioButton
            name="tipoProduto"
            label="Produzido"
            value={1}
            onChange={event =>
              setCost({
                ...cost,
                tipoProduto: event.target.value,
              })
            }
          />
          <RadioButton
            name="tipoProduto"
            label="Revenda"
            value={0}
            onChange={event =>
              setCost({
                ...cost,
                tipoProduto: event.target.value,
              })
            }
          />
        </Box>
        <Typography color={colors.grey[100]}>Substituição Tributária</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          border={`1px solid ${colors.grey[100]}`}
          bgcolor={colors.blueAccent[700]}
        >
          <RadioButton
            name="st"
            label="Sim"
            value={1}
            onChange={event =>
              setCost({
                ...cost,
                st: event.target.value,
              })
            }
          />
          <RadioButton
            name="st"
            label="Não"
            value={0}
            onChange={event =>
              setCost({
                ...cost,
                st: event.target.value,
              })
            }
          />
        </Box>
        <Typography color={colors.grey[100]}>S.Francisco x S.Tereza</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          border={`1px solid ${colors.grey[100]}`}
          bgcolor={colors.blueAccent[700]}
        >
          <RadioButton
            name="sf_st"
            label="Sim"
            value={1}
            onChange={event =>
              setCost({
                ...cost,
                sf_st: event.target.value,
              })
            }
          />
          <RadioButton
            name="sf_st"
            label="Não"
            value={0}
            onChange={event =>
              setCost({
                ...cost,
                sf_st: event.target.value,
              })
            }
          />
        </Box>
        <Box display="flex" justifyContent="space-around" margin="20px 0">
          <Button type="submit" color={colors.greenAccent[600]} wSize="200px" hSize="35px">
            <Typography color={colors.grey[100]}>ADICIONAR MATERIAIS</Typography>
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default HeaderForm;
