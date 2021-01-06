import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// dispatch bisa diakses melalui props ketika connect() ada
const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  // dimasukkan dalam Link, jd semua di dalamnya (termasuk div) jd clickable
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
    </div>
    <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")}</h3>
  </Link>
);

// tidak perlu pake mapStateToProps fun krn ini tdk berhubungan dengan state
export default ExpenseListItem;
