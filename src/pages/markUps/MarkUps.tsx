import React, { useEffect, useState } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import api from '../../api/api';
import { toast } from 'react-toastify';
import { MarkUpTypes } from './types/MarkUpTypes';
import { MarkUpProvider } from '../../contexts/MarkUpContext';
import NewMarkUp from './new/NewMarkUp';
import UpdateMarkUp from './update/UpdateMarkUp';
import MarkUpCard from './MarkUpCard';

const inicialState: MarkUpTypes = {
  id: '' as any,
  name: '',
  impostos: '',
  comissao: '',
  adm: '',
  frete: '',
  financeiro: '',
  promotores: '',
  marketing: '',
  bonificacoes: '',
  lucro: '',
  coeficiente: '' as any,
};

const MarkUps = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [markUp, setMarkUp] = useState<MarkUpTypes>(inicialState);
  const [markUps, setMarkUps] = useState<any[]>([]);
  const [selectedMarkUp, setSelectedMarkUp] = useState<MarkUpTypes | null>(null);
  const [modalNewMarkUp, setModalNewMarkUp] = useState(false);

  useEffect(() => {
    api
      .get('markUpsList')
      .then(res => {
        setMarkUps(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  function openMarkUpForm() {
    setModalNewMarkUp(true);
  }

  function handleRemove(id: number) {
    api
      .delete(`markUpsList/${id}`)
      .then(() => {
        setMarkUps(state => state.filter(markup => markup.id !== id));
        toast.success('Mark Up removido com sucesso!');
      })
      .catch(err => console.log(err));
  }

  return (
    <MarkUpProvider
      value={{
        handleRemove,
        setMarkUps,
        markUps,
        modalNewMarkUp,
        setModalNewMarkUp,
        selectedMarkUp,
        setSelectedMarkUp,
        markUp,
        setMarkUp,
      }}
    >
      <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center" border={colors.greenAccent[500]}>
          <Header title="MARK UPS" subTitle="Lista dos Mark Ups cadastrados" />
          <Button
            onClick={openMarkUpForm}
            sx={{ bgcolor: `${colors.greenAccent[500]}`, color: `${colors.grey[100]}`, height: '100%' }}
            variant="text"
          >
            Cadastrar Novo Mark Up
          </Button>
        </Box>
        {modalNewMarkUp && <NewMarkUp />}

        {selectedMarkUp && <UpdateMarkUp />}

        <Box
          display="flex"
          height="67vh"
          border={`1px solid ${colors.greenAccent[400]}`}
          borderRadius="5px"
          overflow="auto"
          justifyContent="space-around"
          flexWrap="wrap"
        >
          {markUps.map(markUp => (
            <MarkUpCard markUp={markUp} handleRemove={handleRemove} key={markUp.id} />
          ))}
        </Box>
      </Box>
    </MarkUpProvider>
  );
};

export default MarkUps;
