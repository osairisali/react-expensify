import expenseData from "../fixtures/expenses";
import selectExpensesTotal from "../../selectors/expenses-total";

test("should return 0 if no expenses", () => {
  const totalExpenses = selectExpensesTotal();
  expect(totalExpenses).toBe(0);
});

test("should correctly add up a single expense", () => {
  const totalExpenses = selectExpensesTotal([expenseData[1]]);
  expect(totalExpenses).toBe(500);
});

test("should correctly add up multiple expenses", () => {
  const totalExpenses = selectExpensesTotal(expenseData);
  expect(totalExpenses).toBe(1000);
});
