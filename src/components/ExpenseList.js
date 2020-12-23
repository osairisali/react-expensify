import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectExpenses from "../selectors/expenses";
import ExpenseListFilters from "./ExpenseListFilters";

// Compnent ExpenseList akan diimpor melalui ExpenseDashboardPage pada AppRouter

// export const ExpenseList = (props) => (
//   <div>
//     <ExpenseListFilters />
//     {props.expenses.length === 0 ? (
//       <p>No Expenses</p>
//     ) : (
//       props.expenses.map((expense) => {
//         return <ExpenseListItem key={expense.id} {...expense} />;
//       })
//     )}
//     {/* yg bs dirender hanya jsx dan primitive value js, render object akan 
//     return error  */}
//   </div>
// );

export const ExpenseList = ({expenses}) => (
  <div>
    <ExpenseListFilters />
    {expenses.length === 0 ? (
      <p>No Expenses</p>
    ) : (
      expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
    {/* yg bs dirender hanya jsx dan primitive value js, render object akan 
    return error  */}
  </div>
);

// ini fun yg return object untuk digunakan sbg props pada ExpenseList di atas
// fun ini akan menghubungkan store dr redux sbg props pada component ExpenseList
export const mapStateToProps = (state) => {
  return {
    // bisa juga return key-value pair yg bukan dr state store
    // name: "ali",
    expenses: selectExpenses(state.expenses, state.filters),
  };
};

// setiap store berubah, maka komponen akan ikut dirender ulang
export default connect(mapStateToProps)(ExpenseList);
