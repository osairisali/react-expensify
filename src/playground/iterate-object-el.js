// const obj = require("../tests/fixtures/expenses");

const moment = require("moment");

const obj = {
  klo: {
    id: "1",
    createdAt: moment(0).subtract(4, "days").valueOf(),
    note: "",
    description: "apartment",
    amount: 200,
  },
  kli: {
    id: "2",
    createdAt: moment(0).add(4, "days").valueOf(),
    note: "",
    description: "rent",
    amount: 500,
  },
  klu: {
    id: "3",
    createdAt: moment(0).valueOf(),
    note: "",
    description: "hangout",
    amount: 300,
  },
};

console.log("getOwnPropertyNames: ", Object.getOwnPropertyNames(obj));

obj.forEach = function (fn) {
  const customMethods = ["forEach", "forEach2"];

  const ownProperty = Object.getOwnPropertyNames(this).filter(
    (el) => customMethods.indexOf(el) === -1
  );

  ownProperty.forEach((el) => {
    // jgn pake return biar bs looping
    fn(this[el]);
  });

//   for (let i = 0; i < ownProperty.length; i++) {
//     const el = ownProperty[i];
//     // jgn pake return biar bs looping
//     fn(this[el]);
//     // console.log(this[el]);
//   }
};

obj.forEach(({ createdAt }) => {
  console.log("createdAt log using custom forEach: ", createdAt);
});

obj.forEach(({ description, createdAt }) => {
  console.log(
    "createdAt & description log using custom forEach: ",
    createdAt + "--" + description
  );
});

// untuk refresh konsep this
// pd arrow fun, meskipun sdh dienkapsulasi ke obj lain, this tetap mengarah global krn lexical scope
// jadi arrorw functionnya hrs dienkapsulasi dalam regular function atau method dr object

this.nameGlobal = "global";
const nameGlobal = "global const";

const objArrow = {
  namae: "satoso",

  forEach: () => {
    const ownProperty = Object.getOwnPropertyNames(this);
    return ownProperty;
  },
  forEach2() {
    return () => {
      const ownProperty = Object.getOwnPropertyNames(this);
      return ownProperty;
    };
  },
};
console.log("properties from forEach objArrow: ", objArrow.forEach());
console.log("properties from forEach2 objArrow: ", objArrow.forEach2()());
