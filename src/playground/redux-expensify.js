import { createStore, combineReducers } from "redux";
import { v4 as uuid } from "uuid";

// ACTION GENERATORS

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0,
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: { id: uuid(), description, note, amount, createdAt },
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text,
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE",
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT",
});

// SET_START_DATE
// jika startDate arg tdk tersedia, maka undefined akan diberikan secara otomatis oleh js
const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate,
});

// SET_END_DATE
const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate,
});

// expenses REDUCER
const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
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
    default:
      return state;
  }
};

// filters REDUCER
const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined,
};

const filterReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text,
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date",
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount",
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate,
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate,
      };
    default:
      return state;
  }
};

// STORE creation dengan function reducer yg sdh mencakup action
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer,
  })
);

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter((expense) => {
      // console.log("startDate dari getVisibleExpenses: ", startDate);
      // console.log("endDate dari getVisibleExpenses: ", endDate);
      // console.log("createdAt dari getVisibleExpenses: ", expense.createdAt);
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      // console.log("startDateMatch: ", startDateMatch);
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch =
        typeof text !== "string" ||
        expense.description.toLowerCase().includes(text.toLowerCase());

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        // descending sort
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        // descending order
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

console.log("store: ", store);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log("visible expenses: ", visibleExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);
// console.log("isi expenseTwo: ", expenseTwo);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

// store.dispatch(setTextFilter("coffe"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// perhatikan bahwa dispatch ini merubah state yg ditampilkan pada dispatch berikutnya, jd ketika 
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate(2000));
// store.dispatch(setEndDate(2000));

const demoState = {
  expenses: [
    {
      id: "h9agayerh3",
      description: "January rent",
      note: "This was the final payment for that address",
      amount: 54500, // it's in penny, to mitigate rounding problems
      createdAt: 0,
    },
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // amount or date
    startdate: undefined,
    endDate: undefined,
  },
};

// const unsubscribe = store.subscribe;
// console.log(unsubscribe);

// const user = {
//   name: "ali",
//   age: 28,
// };

// console.log({ ...user, lahir: "semarang" });
