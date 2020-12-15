import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { editExpense } from "../actions/expenses";
import { removeExpense } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    console.log("updated expense: ", expense);
    this.props.editExpense(this.props.expense.id, expense);
    this.props.history.push("/");
    // console.log(this);
  };

  onRemove = (e) => {
    console.log("remove button clicked");
    // {id} dienkapsulasi dalam object krn parameter removeExpense butuh object yg didalamnya ada id
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />
        <button onClick={this.onRemove}>Remove</button>
      </div>
    );
  }
}

// const EditExpensePage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <ExpenseForm
//         expense={props.expense}
//         onSubmit={(expense) => {
//           console.log("updated expense: ", expense);
//           props.dispatch(editExpense(props.expense.id, expense));
//           props.history.push("/");
//         }}
//       />
//       <button
//         onClick={(e) => {
//           console.log("remove button clicked");
//           // {id} dienkapsulasi dalam object krn parameter removeExpense butuh object yg didalamnya ada id
//           props.dispatch(removeExpense({ id: props.expense.id }));
//           props.history.push("/");
//         }}
//       >
//         Remove
//       </button>
//     </div>
//   );
// };

// ada dua parameter yg bisa diambil: state dr store dan props dr parent Component Router (akses id dr path)
const mapStateToProps = (state, props) => {
  // console.log("state dari mapStateToProps: ", state, "props: ", props);
  // ini akan return object expense ke props pada EditExpensePage melalui connect()
  return {
    expense: state.expenses.find(
      // akses id untuk filtering expense dari path di Router lewat match.params.id
      (expense) => expense.id === props.match.params.id
    ),
  };
};

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id, expense) => dispatch(editExpense(id, expense)),
  removeExpense: (id) => dispatch(removeExpense({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
