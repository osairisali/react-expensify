import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenseData from "../fixtures/expenses";

let wrapper, editExpense, startRemoveExpense, history;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      expense={expenseData[2]}
      history={history}
    />
  );
});

test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle editExpense", () => {
  wrapper.find("ExpenseForm").prop("onSubmit")(expenseData[2]);
  expect(editExpense).toHaveBeenLastCalledWith(
    expenseData[2].id,
    expenseData[2]
  );

  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should handle removeExpense", () => {
  wrapper.find("button").simulate("click");
  
  expect(history.push).toHaveBeenLastCalledWith("/")
  expect(startRemoveExpense).toHaveBeenLastCalledWith(expenseData[2].id);
});
