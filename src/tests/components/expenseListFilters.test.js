import React from "react";
import { DateRangePicker } from "react-dates";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { shallow } from "enzyme";
import { filters, altFilters } from "../fixtures/filters";

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper;

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle alternative filter", () => {
  // setProps() digunakan untuk set props pada wrapper. ini untuk overwrite defaultValue text filter
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "bor";
  wrapper.find("input").simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenLastCalledWith("bor");
});

test("should handle sort by date", () => {
  const value = "date";
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByDate).toHaveBeenLastCalledWith();
});

test("should handle sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test("should handle date change", () => {
  wrapper.find(DateRangePicker).prop("onDatesChange")({
    startDate: altFilters.startDate,
    endDate: altFilters.endDate,
  });

  expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
});

test("should handle date focus change in state", () => {
  const calendarFocused = "endDate";
  wrapper.find(DateRangePicker).prop("onFocusChange")(calendarFocused);

  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
