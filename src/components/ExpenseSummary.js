import React from "react";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import { connect } from "react-redux";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const expenseWord = expenseCount > 1 ? "expenses" : "expense";
  const formattedExpensesTotal = numeral(expenseTotal / 100).format("$ 0,0.00");

  return (
    <div>
      <h1>
        Viewing {expenseCount} {expenseWord} totalling {formattedExpensesTotal}{" "}
      </h1>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  return {
    expenseCount: visibleExpenses.length,
    expenseTotal: getExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpenseSummary);
