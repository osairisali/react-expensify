import React from "react";
import numeral from "numeral";
import expenseData from "../fixtures/expenses";
import { ExpenseSummary } from "../../components/ExpenseSummary";
import { shallow } from "enzyme";

test("should render expense summary with 1 expense", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={1} expenseTotal={235} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render expense summary with multiple expenses", () => {
  const wrapper = shallow(
    <ExpenseSummary expenseCount={12} expenseTotal={20235} />
  );
  expect(wrapper).toMatchSnapshot();
});
