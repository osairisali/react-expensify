import { v4 as uuid } from "uuid";
import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

// async actions untuk digunakan dengan thunk
export const startAddExpense = (expenseData = {}) => {
  // return function dgn parameter dispatch
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // push ke firebase
    return database
      .ref("expense")
      .push(expense)
      .then((ref) => {
        // update data di redux store
        dispatch(addExpense({ id: ref.key, ...expense }));
      })
      .catch((error) => console.log(error));
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});
