const formatCurrency = (value: number, currency: string) => {
  if (!value) {
    return 0;
  }
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency,
  });
};
export default formatCurrency;
