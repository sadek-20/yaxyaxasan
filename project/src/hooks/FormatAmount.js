export const formatCurrency = (amount) => (
    typeof amount === 'number' ? `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '00'
  );