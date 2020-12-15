import expenseSelector from "../../selectors/expenses";
import moment from "moment";
import expenses from "../fixtures/expenses";

test("should filter by text value", () => {
  const filters = {
    text: "ent",
    sortBy: "amount",
    // startDate: undefined,
    // endDate: undefined,
  };
  const result = expenseSelector(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[0]]);
});

test("should filter by startDate and endDate", () => {
  const filters = {
    startDate: moment(0),
    endDate: moment(0).add(5, "days"),
  };
  const result = expenseSelector(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2]]);
});

test("should filter by endDate", () => {
  const filters = {
    //   startDate: moment(0),
    endDate: moment(0).add(5, "days"),
  };
  const result = expenseSelector(expenses, filters);
  expect(result).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test("should sort by date", () => {
  const filters = {
    sortBy: "date",
    // text: "",
  };
  const result = expenseSelector(expenses, filters);
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});
