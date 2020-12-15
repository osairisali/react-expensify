import React from "react";
import { shallow } from "enzyme";
import { ExpenseList, mapStateToProps } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should return ExpenseList component with expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  // console.log(ExpenseList, mapStateToProps);

  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList with empty message", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);

  expect(wrapper).toMatchSnapshot();
});

