import React from "react";
import { shallow } from "enzyme";
import { AddExpensePage } from "../../components/AddExpensePage";
import expenseData from "../fixtures/expenses";

let wrapper, addExpense, history;

beforeEach(() => {
  addExpense = jest.fn();
  history = { push: jest.fn() };
  // perhatikan parameter addExpense dan history diberikan pada AddExpenseComponent
  // sebetulnya untuk history dan addExpense di app tdk usah diberikan, tp untuk tes ini diberikan agar tdk pake
  // props history dan addExpense dr dispatch
  wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test("should render AddExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenseData[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(addExpense).toHaveBeenLastCalledWith(expenseData[1]);
});
