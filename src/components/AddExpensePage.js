import React from "react";
import ExpenseForm from "./ExpenseForm";
import { connect } from "react-redux";
import { startAddExpense } from "../actions/expenses";

// dibuatkan class agar tidak render AddExpensePage berulangkali
// export AddExpensePage ini cuma untuk test case
export class AddExpensePage extends React.Component {
  // dibuatkan variabel berupa arrow fun sbg referensi eksekusi ketika addExpense prop
  // pada AddExpensePage dijalankan, pakai method biasa juga bisa tapi harus pake bind()
  // ini terkait referensi this pada method yg mengarah ke instance onSubmit ketika direferensikan
  // dengan this.addExpense tanpa binding pada <AddExpenseForm />
  startAddExpense = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push("/");
    // console.log(Object.getOwnPropertyNames(this));
  };

  // sebagai method pada class pada umumnya
  // onSubmit(expense) {
  //   this.props.addExpense(expense);
  //   this.props.history.push("/");
  //   console.log(this);
  // }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Expense</h1>
          </div>
        </div>

        <div className="content-container">
          <ExpenseForm onSubmit={this.startAddExpense} />
        </div>
      </div>
    );
  }
}

// const AddExpensePage = (props) => (
//   <div>
//     <h1>Add Expense</h1>
//     <ExpenseForm
//       onSubmit={(expense) => {
//         console.log(expense);
//         props.dispatch(addExpense(expense));
//         // langsung redirect ke dashboard
//         props.history.push("/");
//       }}
//     />
//   </div>
// );

// mapDispatchToProps adalah arg kedua setelah arg mapStateToProps pada connect
// bekerja untuk return object addExpense ke props dari AddExpensePage
const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
});

// nggak usah pake mapStateToProps krn nggak ngambil state dari sini
// cuma nambahin state, jd nggak perlu ambil prevState dr store
export default connect(undefined, mapDispatchToProps)(AddExpensePage);
