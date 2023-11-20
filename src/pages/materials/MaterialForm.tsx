import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { MaterialTypes } from './types/MaterialTypes';
import { useMaterials } from '../../contexts/MaterialContext';
import Header from '../../components/Header';
import ModalComponent from '../../components/modal/ModalComponent';
import { Input } from '../../components/form/input/Input';
import { SelectUnits } from '../../components/form/selectUnits/Selectunits';
import { Typography, Box, useTheme } from '@mui/material';
import { RadioButton } from '../../components/form/radioButton/RadioButton';
import { tokens } from '../../theme';
import { Button } from '../../components/form/button/Style';

interface FormMaterialsProps {
  material: MaterialTypes;
  setMaterial: Dispatch<SetStateAction<MaterialTypes>>;
  handleSubmit(material: MaterialTypes): void;
}

export const MaterialForm = ({ material, setMaterial, handleSubmit }: FormMaterialsProps) => {
  const { selectedMaterial, setSelectedMaterial, setModalNewMaterial } = useMaterials();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (!selectedMaterial) {
      return;
    }
    setMaterial(selectedMaterial);
  }, [setMaterial, selectedMaterial]);

  function _handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit({ ...material });
    handleClose();
  }

  function handleClose() {
    if (selectedMaterial) {
      setSelectedMaterial(null);
    }
    setModalNewMaterial(false);
  }
  return (
    <ModalComponent>
      <form onSubmit={_handleSubmit}>
        <Header title="NOVO MATERIAL" subTitle="Cadastre um novo material" />
        <Input
          type="text"
          value={material.name}
          label="Descrição do Material"
          name="name"
          placeholder="Descreva o material"
          onChange={event =>
            setMaterial({
              ...material,
              name: event.currentTarget.value.toUpperCase(),
            })
          }
        />
        <Input
          type="number"
          value={material.preco}
          label="Valor"
          name="preco"
          placeholder="Informe o valor do material"
          onChange={event =>
            setMaterial({
              ...material,
              preco: Number(event.currentTarget.value),
            })
          }
        />
        <SelectUnits
          label="Unidade"
          name="unid"
          value={material.unid}
          onChange={event =>
            setMaterial({
              ...material,
              unid: event.currentTarget.value,
            })
          }
        />
        <Input
          type="number"
          value={material.frete}
          label="Frete %"
          name="frete"
          placeholder="Informe o % de frete"
          onChange={event =>
            setMaterial({
              ...material,
              frete: Number(event.currentTarget.value),
            })
          }
        />
        <Input
          type="number"
          value={material.nf}
          label="NF %"
          name="nf"
          placeholder="Informe o % de NF"
          onChange={event =>
            setMaterial({
              ...material,
              nf: Number(event.currentTarget.value),
            })
          }
        />
        <Input
          type="number"
          value={material.icms}
          label="ICMS %"
          name="icms"
          placeholder="Informe o % de ICMS"
          onChange={event =>
            setMaterial({
              ...material,
              icms: Number(event.currentTarget.value),
            })
          }
        />
        <Typography color={colors.grey[100]}> Tipo de Fornecedor</Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="5px"
          border={`1px solid ${colors.grey[100]}`}
          bgcolor={colors.blueAccent[700]}
        >
          <RadioButton
            name="tipoFornecedor"
            label="Simples"
            value={1}
            onChange={event =>
              setMaterial({
                ...material,
                tipoFornecedor: event.target.value,
              })
            }
          />
          <RadioButton
            name="tipoFornecedor"
            label="Presumido"
            value={0}
            onChange={event =>
              setMaterial({
                ...material,
                tipoFornecedor: event.target.value,
              })
            }
          />
        </Box>
        <Box display="flex" justifyContent="space-around" margin="20px 0">
          <Button type="submit" color={colors.greenAccent[600]} wSize="150px" hSize="35px">
            <Typography color={colors.grey[100]}>CADASTRAR</Typography>
          </Button>
          <Button type="button" onClick={handleClose} color={colors.greenAccent[600]} wSize="150px" hSize="35px">
            <Typography color={colors.grey[100]}>CANCELAR</Typography>
          </Button>
        </Box>
      </form>
    </ModalComponent>
  );
};
