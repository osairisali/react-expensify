import React from "react";
import numeral from "numeral";
import { Link } from "react-router-dom";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";
import { connect } from "react-redux";

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const expenseWord = expenseCount > 1 ? "expenses" : "expense";
  const formattedExpensesTotal = numeral(expenseTotal / 100).format("$ 0,0.00");

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expenseCount}</span> {expenseWord} totalling{" "}
          <span>{formattedExpensesTotal}</span>{" "}
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Create Expense
          </Link>
        </div>
      </div>
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
