const expensesSum = (expenses) => {
  const expensesArray = expenses ? [...expenses] : [{ amount: 0 }];
  const reducer = (acc, { amount }) => acc + parseInt(amount);
  const totalExpenses = expensesArray.reduce(reducer, 0);
  return totalExpenses;
};

export default expensesSum;
