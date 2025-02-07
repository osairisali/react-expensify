import React from "react";
import { shallow } from "enzyme";
import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";

test("should return ExpenseDashboardPage component", () => {
  const wrapper = shallow(<ExpenseDashboardPage />);

  expect(wrapper).toMatchSnapshot();
});
