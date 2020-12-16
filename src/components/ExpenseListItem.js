import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

// dispatch bisa diakses melalui props ketika connect() ada
const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <Link to={`/edit/${id}`}>{description}</Link>
    <p>
      {numeral(amount / 100).format("$ 0,0.00")} 
      - 
      {moment(createdAt).format("MMMM Do, YYYY")}
    </p>
    
  </div>
);

// tidak perlu pake mapStateToProps fun krn ini tdk berhubungan dengan state
export default ExpenseListItem;
