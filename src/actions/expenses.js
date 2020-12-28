import { v4 as uuid } from "uuid";
import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

// async actions untuk digunakan dengan thunk
export const startAddExpense = (expenseData = {}) => {
  // return function dgn parameter dispatch, ini dipanggil oleh redux thunk middleware
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // push ke firebase
    return database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then((ref) => {
        // update data di redux store
        dispatch(addExpense({ id: ref.key, ...expense }));
      })
      .catch((error) => console.log(error));
  };
};

// REMOVE_EXPENSE
export const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const startRemoveExpense = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        console.log("expense berhasil dihapus");
        dispatch(removeExpense(id));
      })
      .catch((error) => console.log(error));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update({ ...updates })
      .then(() => {
        console.log("berhasil update data");
        dispatch(editExpense(id, updates));
      })
      .catch((error) => console.log(error));
  };
};

export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then((snapshot) => {
        let expenses = [];
        // console.log("snapshot from startSetExpenses: ", snapshot.val());

        // forEach adalah fungsi iterasi elemen object disediakan firebase
        snapshot.forEach((expense) => {
          expenses.push({ id: expense.key, ...expense.val() });
        });
        // console.log(expenses);

        // dispatch seluruh data expenses yg diterima dengan setExpenses()
        dispatch(setExpenses(expenses));
      })
      .catch((error) => console.log(error));
  };
};
