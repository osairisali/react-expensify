import moment from "moment";

export default [
  {
    id: "1",
    createdAt: moment(0).subtract(4, "days").valueOf(),
    note: "",
    description: "apartment",
    amount: 200,
  },
  {
    id: "2",
    createdAt: moment(0).add(4, "days").valueOf(),
    note: "",
    description: "rent",
    amount: 500,
  },
  {
    id: "3",
    createdAt: moment(0).valueOf(),
    note: "",
    description: "hangout",
    amount: 300,
  },
];
