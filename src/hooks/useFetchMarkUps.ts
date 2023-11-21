import { useEffect, useState } from 'react';
import api from '../api/api';
import { MarkUpTypes } from '../pages/markUps/types/MarkUpTypes';

export function useFetchMarkUps() {
  const [markUps, setMarkUps] = useState<MarkUpTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .get('markUpsList')
      .then(res => {
        setMarkUps(res.data);
      })
      .catch(err => {
        console.log(err);
        setError('Não foi possível recuperar os Mark Ups');
      })
      .finally(() => setLoading(false));
  }, []);

  return { markUps, loading, error };
}
