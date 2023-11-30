import React, { useEffect, useState } from 'react';
import { InformationsTypes } from './types/InformationsType';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { InformationProvider } from '../../contexts/InformationContext';
import Header from '../../components/Header';
import api from '../../api/api';
import { toast } from 'react-toastify';
import InformationItem from './InformationItem';
import InformationItemHeader from './InformationItemHeader';
import NewInformation from './new/NewInformation';
import UpdateInformation from './update/UpdateInformation';

const initialState: InformationsTypes = {
  id: '',
  cod: '' as any,
  name: '',
  tabela: '' as any,
  precoMedio: '' as any,
};

const Informations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [information, setInformation] = useState<InformationsTypes>(initialState);
  const [informations, setInformations] = useState<any[]>([]);
  const [selectedInformation, setSelectedInformation] = useState<InformationsTypes | null>(null);
  const [modalNewInformation, setModalNewInformation] = useState(false);

  useEffect(() => {
    api
      .get('informations')
      .then(res => {
        setInformations(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function handleRemove(id: string) {
    api
      .delete(`informations/${id}`)
      .then(() => {
        setInformations(state => state.filter(operation => operation.id !== id));
        toast.success('Operação removida com sucesso!');
      })
      .catch(err => console.log(err));
  }
  function openInformationForm() {
    setModalNewInformation(true);
  }

  return (
    <InformationProvider
      value={{
        handleRemove,
        setInformations,
        informations,
        modalNewInformation,
        setModalNewInformation,
        selectedInformation,
        setSelectedInformation,
        information,
        setInformation,
      }}
    >
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" border={colors.greenAccent[500]}>
          <Header title="INFORMAÇÕES" subTitle="Informações dos produtos" />
          <Button
            onClick={openInformationForm}
            sx={{ bgcolor: `${colors.greenAccent[500]}`, color: `${colors.grey[100]}`, height: '100%' }}
            variant="text"
          >
            Cadastrar Nova Informação
          </Button>
        </Box>
        {modalNewInformation && <NewInformation />}

        {selectedInformation && <UpdateInformation />}

        <Box>
          <InformationItemHeader />
        </Box>
        <Box height="67vh" border={`1px solid ${colors.greenAccent[400]}`} borderRadius="5px" overflow="auto">
          {informations.map(information => (
            <InformationItem information={information} handleRemove={handleRemove} key={information.id} />
          ))}
        </Box>
      </Box>
    </InformationProvider>
  );
};

export default Informations;
