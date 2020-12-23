import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  removeExpense,
  editExpense,
  setExpenses,
  startSetExpenses,
} from "../../actions/expenses";
import { v4 as uuid } from "uuid";
import expenseData from "../fixtures/expenses";
import database from "../../firebase/firebase";

// konfigurasi store untuk dijalankan di setiap pengujian ini
// parameter array-nya berisi middlewares, kali ini pake thunk
const createMockStore = configureMockStore([thunk]);

// semua data yg ditulis di test cases akan dihapus secara otomatis oleh jest, dan
// hanya menyisakan test data hasil dari beforeEach. Ini krn beforeEach akan dieksekusi untuk tiap test case
beforeEach((done) => {
  const expenses = {};

  expenseData.forEach(({ id, description, amount, note, createdAt }) => {
    expenses[id] = { description, amount, createdAt, note };
  });

  database
    .ref("expense")
    .set(expenses)
    .then(() => done());
});

test("should setup remove-expense action object", () => {
  const action = removeExpense({ id: "123abc" });

  // pakai toEqual untuk membandingkan object
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup add expense action object with provided values", () => {
  const actions = addExpense(expenseData[1]);

  expect(actions).toEqual({
    type: "ADD_EXPENSE",
    expense: expenseData[1],
  });
});

// untuk set adanya async function di jest, sediakan param done
// proses async akan berhenti sampai done() dipanggil
test("should add expense to database and redux store", (done) => {
  const store = createMockStore({});
  const expense = {
    note: "a note",
    description: "a description",
    amount: 3000,
    createdAt: 10000,
  };

  store.dispatch(startAddExpense(expense)).then(() => {
    // ambil actions yg di-dispatch dari startAddExpense
    // ini berupa array dgn elemen pertama selalu action yg pertama di dispatch (sesuai urutan eksekusi)
    const actions = store.getActions();
    console.log(actions[0].expense);
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expense,
      },
    });

    // ambil id dari actions krn id ini sdh di push ke firebase
    database
      .ref(`expense/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        // pengujian hasil fetch data dari firebase
        expect(snapshot.val()).toEqual(expense);
        done();
      });
  });
});

test("should add expense with defaults value to firebase and redux store", (done) => {
  const store = createMockStore({});

  const expenseDefault = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };

  store.dispatch(startAddExpense(expenseDefault)).then(() => {
    const actions = store.getActions();

    // test in redux store
    expect(actions[0]).toEqual({
      type: "ADD_EXPENSE",
      expense: {
        id: expect.any(String),
        ...expenseDefault,
      },
    });

    // test in firebase
    database
      .ref(`expense/${actions[0].expense.id}`)
      .once("value")
      .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
      });
  });
});

// test("should setup add-expense action object with provided values", () => {
//   const action = addExpense({
//     description: "a description",
//     amount: 23,
//     note: "a note",
//     createdAt: 2,
//   });

//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       // pakai expect.any() untuk mencocokkan menurut jenis primitive value
//       id: expect.any(String),
//       description: "a description",
//       amount: 23,
//       note: "a note",
//       createdAt: 2,
//     },
//   });
// });

// test("should setup add-expense action object with default values", () => {
//   const action = addExpense();

//   expect(action).toEqual({
//     type: "ADD_EXPENSE",
//     expense: {
//       // pakai expect.any() untuk mencocokkan menurut jenis primitive value
//       id: expect.any(String),
//       description: "",
//       amount: 0,
//       note: "",
//       createdAt: 0,
//     },
//   });
// });

test("should setup edit-expense action object", () => {
  const action = editExpense("123abc", {
    description: "a description",
    amount: 23,
    note: "a note",
    createdAt: 2,
  });

  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123abc",
    updates: {
      description: "a description",
      amount: 23,
      note: "a note",
      createdAt: 2,
    },
  });
});

test("should return set expenses action object", () => {
  const action = setExpenses(expenseData);
  expect(action).toEqual({ type: "SET_EXPENSES", expenses: expenseData });
});

test("should fetch the expenses from firebase", (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: "SET_EXPENSES", expenses: expenseData });
    done();
  });
});
