import React from "react";
import { Link } from "react-router-dom";

// dispatch bisa diakses melalui props ketika connect() ada
const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <div>
    <Link to={`/edit/${id}`}>{description}</Link>
    <p>
      {amount} - {createdAt}
    </p>
    
  </div>
);

// tidak perlu pake mapStateToProps fun krn ini tdk berhubungan dengan state
export default ExpenseListItem;
