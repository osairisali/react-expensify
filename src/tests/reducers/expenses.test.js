import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";
import moment from "moment";

// default action object dari store adalah { type: "@@INIT" }
test("should return empty array", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  });

  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense by unknown id", () => {
  const state = expensesReducer(expenses, {
    type: "REMOVE_EXPENSE",
    id: "-1",
  });

  expect(state).toEqual(expenses);
});

test("should add expense", () => {
  const additionalExpense = {
    id: "4",
    createdAt: moment(1).valueOf(),
    note: "",
    description: "added expense",
    amount: 700,
  };
  const state = expensesReducer(expenses, {
    type: "ADD_EXPENSE",
    expense: additionalExpense,
  });

  expect(state).toEqual([...expenses, additionalExpense]);
});

test("should edit expense", () => {
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      id: "1",
      createdAt: moment(0).subtract(4, "days").valueOf(),
      note: "",
      description: "apartment",
      amount: 500,
    },
  });

  expect(state[0].amount).toBe(500);
});

test("should not edit expense with unknown id", () => {
  const state = expensesReducer(expenses, {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      id: "1",
      createdAt: moment(0).subtract(4, "days").valueOf(),
      note: "",
      description: "apartment",
      amount: 500,
    },
  });

  expect(state).toEqual(expenses);
});
