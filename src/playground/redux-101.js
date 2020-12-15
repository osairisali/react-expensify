import { createStore } from "redux";

// Action generators -> generating action objects agar error krn typo tampak eksplisit saat eksekusi store.dispatch()
// payload harus dibuat default empty object untuk menghindari error of undefined saat akses payload.incrementBy
// const incrementCount = (payload = {}) => ({
//   type: "INCREMENT",
//   incrementBy:
//     typeof payload.incrementBy === "number" ? payload.incrementBy : 1,
// });

// bentuk lain dengan destructuring dan default value incrementBy = 1 jika tidak ada object-nya
const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy,
});

const setCount = ({ count } = {}) => ({
  type: "SET",
  count,
});

const resetCount = () => ({
  type: "RESET",
});

// ketika store.dispatch(decrementCount()) dipanggil, maka arg yg kosong akan default diisi empty object {},
// kemudian {} dibuat default value berupa {decrementBy = 1}
const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy,
});

const reducer = (state = { count: 0 }, action) => {
  console.log("running");

  switch (action.type) {
    case "INCREMENT":
      return {
        count: state.count + action.incrementBy,
      };
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy,
      };
    case "SET":
      return {
        count: action.count,
      };
    case "RESET":
      return {
        count: 0,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

// setiap ada perubahan state, akan ditampilkan console.log state
// store.subscribe(() => {
//   console.log("subscribe: ", store.getState());
// });

// untuk unsubscribe simpan function call subscribe dan call it
const unsubscribe = store.subscribe(() => {
  console.log("subscribe: ", store.getState());
});

// increment the count
// type action name conventions to use UPPERCASE
// ini model dispatch lawas, tanpa action object generator
store.dispatch({
  type: "INCREMENT",
  incrementBy: 2,
});

// model dispatch dengan action generator function
store.dispatch(incrementCount({ incrementBy: 2 }));

store.dispatch(incrementCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 2 }));

store.dispatch(setCount({ count: 101 }));

store.dispatch(resetCount());

// perubahan tidak akan ditampilkan lagi setelah baris perintah ini
unsubscribe();
