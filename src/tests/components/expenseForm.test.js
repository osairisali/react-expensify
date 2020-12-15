import React from "react";
import ExpenseForm from "../../components/ExpenseForm";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { shallow } from "enzyme";
import expenseData from "../fixtures/expenses";

test("should render Expense Form correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render expense form with expense data", () => {
  const wrapper = shallow(<ExpenseForm expense={expenseData[1]} />);
  //   console.log(expenseData[1]);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ExpenseForm />);

  // buat snapshot untuk kondisi awal rendering ExpenseForm
  expect(wrapper).toMatchSnapshot();

  // simulasi submit form dengan invalid data
  wrapper.find("form").simulate("submit", {
    // sediakan mock manual untuk e.preventDefault() agar tdk error
    preventDefault: () => {},
  });

  // cek pada state ExpenseForm harus lebih dari nol
  expect(wrapper.state("error").length).toBeGreaterThan(0);

  // buat snapshot ketika error dari invalid data terjadi
  expect(wrapper).toMatchSnapshot();
});

test("should set state of description", () => {
  const value = "description change";
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();

  // simulasi isi input pertama (input description)
  // arg pada simulate adalah e.target.value krn kita akses value description seperti ini di HTML
  wrapper.find("input").at(0).simulate("change", {
    target: { value },
  });

  expect(wrapper.state("description")).toBe(value);

  expect(wrapper).toMatchSnapshot();
});

test("should set note on textarea change", () => {
  const value = "note change";
  const wrapper = shallow(<ExpenseForm />);

  expect(wrapper).toMatchSnapshot();

  wrapper.find("textarea").simulate("change", {
    target: { value },
  });

  expect(wrapper.state("note")).toBe(value);

  expect(wrapper).toMatchSnapshot();
});

test("should set state of amount if valid input", () => {
  const value = "23.58";
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });

  expect(wrapper.state("amount")).toBe(value);
});

test("should not set state of amount if invalid input", () => {
  const value = "23.5856568";
  const wrapper = shallow(<ExpenseForm />);

  wrapper.find("input").at(1).simulate("change", {
    target: { value },
  });

  expect(wrapper.state("amount")).toBe("");
});

// ini tidak cek apakah state berubah semua ketika simulasi submit form
// hanya tes apakah fungsi prop onSubmit berjalan dgn argumen yg diberikan
test("should call submit prop fro valid form submission", () => {
  const onSubmitSpy = jest.fn();

  // onSubmit pakai onSubmitSpy untuk cek apakah fungsi ini dipanggil saat render ExpenseForm
  const wrapper = shallow(
    <ExpenseForm expense={expenseData[0]} onSubmit={onSubmitSpy} />
  );

  // simulasi submit form
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {},
  });

  // cek apakah error state adalah empty string
  expect(wrapper.state("error")).toBe("");

  // cek bahwa onSubmit telah dipanggil terakhir kali dengan argumen note, description, dll.
  // ini perlu ditentukan manual, krn pada expenseData[0] terdapat element id yg bs menimbulkan error
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenseData[0].description,
    note: expenseData[0].note,
    createdAt: expenseData[0].createdAt,
    amount: expenseData[0].amount,
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);

  // ambil component SingleDatePicker dan jalankan prop onDateChange dengan input now
  // di sini pake class SingleDatePicker, jd nggak pake tanda kutip, dgn tentunya import SingleDatePicker terlebih dahulu
  wrapper.find(SingleDatePicker).prop("onDateChange")(now);

  expect(wrapper.state("createdAt")).toEqual(now);
});

test("execute onFocusChange to true", () => {
  const focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(true);
});
