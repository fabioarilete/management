import { useEffect, useState } from 'react';
import api from '../api/api';
import { InfoTypes } from '../pages/costs/types/InfoTypes';

export function useFetchInfo() {
  const [informations, setInformations] = useState<InfoTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('infoProdutos')
      .then(res => {
        setInformations(res.data);
      })
      .catch(err => {
        console.log(err);
        setError('Não foi possível recuperar as informações');
      })
      .finally(() => setLoading(false));
  }, []);

  return { informations, loading, error };
}
