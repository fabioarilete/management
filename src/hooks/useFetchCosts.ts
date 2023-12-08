import { useEffect, useState } from 'react';
import api from '../api/api';
import { CostTypes } from '../pages/costs/types/CostTypes';

export function useFetchCost(id?: string) {
  const [cost, setCost] = useState<CostTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }
    api
      .get(`costs/${id}`)
      .then(res => {
        setCost(res.data);
      })
      .catch(err => {
        console.log(err);
        setError('Não foi possível recuperar as informações');
      })
      .finally(() => setLoading(false));
  }, []);

  return { cost, loading, error };
}
