import "react-dates/initialize";
import React from "react";
import { connect } from "react-redux";
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
} from "../actions/filters";
import { DateRangePicker } from "react-dates";

//export class untuk test
export class ExpenseListFilters extends React.Component {
  // nggak usah pake constructor krn nggak ada props yg dimasukkan ke Component ExpenseListFilters dari ExpenseList
  // constructor(props) {
  //   super(props);
  // }

  state = {
    calendarFocused: null,
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  };

  setTextFilter = (e) => {
    // dispatch dapat diakses melalui props selama dihubungkan ke store lewat connect()
    this.props.setTextFilter(e.target.value);
    console.log(e.target.value);
  };

  sortBy = (e) => {
    if (e.target.value === "date") {
      this.props.sortByDate();
    } else if (e.target.value === "amount") {
      this.props.sortByAmount();
    }
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <div className="input-group__item">
            <input
              className="text-input"
              placeholder="Search expenses"
              type="text"
              defaultValue={this.props.filters.text}
              // regiter function ketika terjadi perubahan pada input field
              onChange={this.setTextFilter}
            />
          </div>
          <div className="input-group__item">
            <select
              className="select"
              value={this.props.filters.sortBy}
              onChange={this.sortBy}
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
          <div className="input-group__item">
            <DateRangePicker
              startDate={this.props.filters.startDate}
              endDate={this.props.filters.endDate}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              showClearDates={true}
              isOutsideRange={() => false}
              startDateId={"startDate"}
              endDateId={"endDate"}
            />
          </div>
        </div>
      </div>
    );
  }
}

// ExpenseListFilters akan diimport oleh ExpenseList

// const ExpenseListFilters = (props) => (
//   <div>
//     <input
//       type="text"
//       defaultValue={props.filters.text}
//       // regiter function ketika terjadi perubahan pada input field
//       onChange={(e) => {
//         // dispatch dapat diakses melalui props
//         props.dispatch(setTextFilter(e.target.value));
//         console.log(e.target.value);
//       }}
//     />
//     <select
//       value={props.filters.sortBy}
//       onChange={(e) => {
//         if (e.target.value === "date") {
//           props.dispatch(sortByDate());
//         } else if (e.target.value === "amount") {
//           props.dispatch(sortByAmount());
//         }
//       }}
//     >
//       <option value="date">Date</option>
//       <option value="amount">Amount</option>
//     </select>
//   </div>
// );

const mapStateToProps = (state) => {
  // ambil default state dr filters untuk diteruskan sebagai props pada ExpenseListFilters
  return {
    filters: state.filters,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => {
    dispatch(setStartDate(startDate));
  },
  setEndDate: (endDate) => {
    dispatch(setEndDate(endDate));
  },
  setTextFilter: (text) => {
    dispatch(setTextFilter(text));
  },
  sortByDate: () => {
    dispatch(sortByDate());
  },
  sortByAmount: () => {
    dispatch(sortByAmount());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
