// expenses REDUCER
const expenseReducerDefaultState = [];

export default (state = expenseReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id.toString() !== action.id.toString());
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) {
          // overwrite expense with new updates
          return { ...expense, ...action.updates };
        } else {
          return expense;
        }
      });
    case "SET_EXPENSES":
      return action.expenses
    default:
      return state;
  }
};
