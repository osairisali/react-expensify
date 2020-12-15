import { addExpense, removeExpense, editExpense } from "../../actions/expenses";
import { v4 as uuid } from "uuid";

test("should setup remove-expense action object", () => {
  const action = removeExpense({ id: "123abc" });

  // pakai toEqual untuk membandingkan object
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup add-expense action object with provided values", () => {
  const action = addExpense({
    description: "a description",
    amount: 23,
    note: "a note",
    createdAt: 2,
  });

  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      // pakai expect.any() untuk mencocokkan menurut jenis primitive value
      id: expect.any(String),
      description: "a description",
      amount: 23,
      note: "a note",
      createdAt: 2,
    },
  });
});

test("should setup add-expense action object with default values", () => {
    const action = addExpense();
  
    expect(action).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        // pakai expect.any() untuk mencocokkan menurut jenis primitive value
        id: expect.any(String),
        description: "",
        amount: 0,
        note: "",
        createdAt: 0,
      },
    });
  });

test("should setup edit-expense action object", () => {
  const action = editExpense("123abc", {
    description: "a description",
    amount: 23,
    note: "a note",
    createdAt: 2,
  });

  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "a description",
      amount: 23,
      note: "a note",
      createdAt: 2,
    },
  });
});
