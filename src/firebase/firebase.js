import firebase from "firebase/app";
import "firebase/database";

// pake import begini nggak bisa ternyata, entah mengapa
// import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// semua ini berjalan secara async

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };

// // init database content
// database
//   .ref()
//   .set({
//     name: "Ali",
//     age: 28,
//     isSingle: true,
//     location: {
//       city: "sidoarjo",
//       country: "indonesia",
//     },
//   })
//   .then((data) => {
//     console.log("data is saved");
//     console.log("data: ", data);
//   })
//   .catch((error) => console.log("failed:", error));

// // cara update db di firebase
// database
//   .ref("age")
//   .set(29)
//   .then(() => console.log("success"))
//   .catch((error) => console.log("failed: ", error));
// database
//   .ref("location/city")
//   .set("jakarta")
//   .then(() => console.log("success"))
//   .catch((error) => console.log("failed: ", error));

// // menambahkan elemen yg blm ada
// database
//   .ref("attributes")
//   .set({ height: 169, weight: 66 })
//   .then(() => console.log("success"))
//   .catch((error) => console.log("failed: ", error));

// // cara menghapus element dengan remove()
// database
//   .ref("isSingle")
//   .remove()
//   .then(() => console.log("successfully remove element"))
//   .catch((error) => console.log(error));

// database
//   .ref("location/country")
//   .set(null)
//   .then(() => console.log("successfully remove element using set(null)"))
//   .catch((error) => console.log(error));

// // update element, menambahkan elemen baru, dan menghapus elemen dengan update()
// database
//   .ref()
//   .update({
//     // hapus elemen dgn null
//     age: null,
//     // tambah elemen baru
//     isSingle: true,
//     "location/country": "indonesia",
//     // perhatikan cara update nested element ini, jk langsung pake location:{city: 'jakarta'},
//     // nanti element location akan kehilangan elemen country
//     "location/city": "surabaya",
//   })
//   .then(() => console.log("successfully update element using update(...)"))
//   .catch((error) => console.log(error));

// // fetching data ke firebase hanya sekali dgn once("value")
// // Listens for exactly one event of the specified event type, and then stops listening.
// // This is equivalent to calling on(), and then calling off() inside the callback function.
// database
//   .ref("location")
//   .once("value")
//   .then((snapshot) => console.log("data snapshot fetched: ", snapshot.val()))
//   .catch((error) => console.log(error));

// // terima info dr firebase ketika ada perubahan pada database (mirip subscribe pada redux)
// const onValueChange = (snapshot) => {
//   // pakai callback agar callback ini dpt dipanggil berulang kali
//   // klo pake then() chain, cuma bs panggil fungsi sekali
//   const value = snapshot.val();
//   console.log("data terbaru: ", value);
// };

// const onErrorValueChange = (error) => {
//   console.log("error receiving update from firebase: ", error);
// };

// // subscribe ke perubahan data terbaru dgn callback, bukan then() chains
// database.ref().on("value", onValueChange, onErrorValueChange);

// setTimeout(() => database.ref("age").set(28), 3500);

// setTimeout(() => database.ref("age").set(29), 7000);

// // unsubscribe dari update data terbaru
// // nggak ada third arg untk callback ketika error
// setTimeout(() => database.ref().off("value", onValueChange), 10500);

// // data diupdate ini mestinya tidak akan notif ke browser
// setTimeout(() => database.ref("age").set(30), 13500);

//--------------------------------------------------------------------------------------------------------
// const onValueChange = (snapshot) => {
//   let expenses = [];

//   // snapshot adalh object bukan array, forEach method dr firebase
//   snapshot.forEach((childSnapshot) => {
//     expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
//   });

//   console.log("data updates: ", expenses);
// };

// const onChildRemove = (snapshot) => {
//   console.log("child removed: ", snapshot.key, snapshot.val());
// };

// const onFailed = (error) => {
//   console.log(error);
// };

// // subscribe to data updates
// // database.ref().on("value", onValueChange, onFailed);

// // versi subscribe to child remove
// database.ref("expenses").on("child_removed", onChildRemove, onFailed);

// // buat database berupa array-like object dan notifikasi ke console.log setiap object update
// database.ref("expenses").push({
//   description: " a rent",
//   amount: 300,
//   note: "",
//   createdAt: Date.now(),
// });

// setTimeout(() => {
//   database.ref("expenses").push({
//     description: "food costs",
//     amount: 500,
//     note: "",
//     createdAt: Date.now(),
//   });
// }, 3500);

// database
//   .ref("expenses")
//   .once("value")
//   .then((snapshot) => {
//     let expenses = [];

//     // snapshot adalh object bukan array, forEach method dr firebase
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({ id: childSnapshot.key, ...childSnapshot.val() });
//     });

//     console.log(expenses);
//   })
//   .catch((error) => console.log(error));
