import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should setup default filter values", () => {
  // param pertama sengaja nggak diisi (pakai undefined) agar pakai default state
  // param action pada reducer menggunakan {type: "@@INIT"} dari redux store, bkn seperti action yg biasa dibuat
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month"),
  });
});

test("should set sortBy to amount", () => {
  const currentState = {
    text: "",
    // sengaja dibuat amount agar bs dilihat berubah jd "date"
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined,
  };

  const action = { type: "SORT_BY_DATE" };

  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe("date");
});

test("should set text filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text: "er",
  });

  expect(state.text).toBe("er");
});

test("should set startDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate: moment(0).add(3, "days").valueOf(),
  });

  expect(state.startDate).toBe(moment(0).add(3, "days").valueOf());
});

test("should set endDate filter", () => {
  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate: moment(0).add(3, "days").valueOf(),
  });

  expect(state.endDate).toBe(moment(0).add(3, "days").valueOf());
});
