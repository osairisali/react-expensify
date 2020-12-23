import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component {
  // pakai constructor agar bisa akses props yg diteruskan pada komponen ini dari EditExpensePage dan AddExpensePage
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      note: props.expense ? props.expense.note : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
    };
  }

  // hanya menyimpan state sebagai object dlm class ExpenseForm, bukan pada constructor
  // state = {
  //   description: "",
  //   amount: "",
  //   note: "",
  //   createdAt: moment(),
  //   calendarFocused: false,
  //   error: "",
  // };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onAmountChange = (e) => {
    const amount = e.target.value;
    // digit maksimal 2 angka sekaligus memastikan data yg diinput adalah number
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));

    // alternatif lain jika tanpa membuat variable note terlebih dahulu perlu pakai e.persist()
    // jk tdk, maka akan muncul error
    // e.persist();
    // this.setState(() => ({ note: e.target.value }));
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: "Please provide description and amount!",
      }));
    } else {
      this.setState(() => ({ error: "" }));
      // return object data to props
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.error}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Description"
            autoFocus
            value={this.state.description}
            onChange={this.onDescriptionChange}
          />
          {/* pakai prop step="any" agar bisa input floating number */}
          <input
            type="number"
            step="any"
            placeholder="Amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
          />
          <SingleDatePicker
            date={this.state.createdAt}
            focused={this.state.calendarFocused}
            onDateChange={this.onDateChange}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <textarea
            placeholder="Add note for your expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
          ></textarea>
          <button>Add Expense</button>
        </form>
      </div>
    );
  }
}
