import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";

const ExpenseDashboardPage = () => (
  <div>
    <ExpenseSummary />
    <ExpenseList />
  </div>
);

export default ExpenseDashboardPage;
