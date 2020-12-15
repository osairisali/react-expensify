// import moment di sini pakai require.requireActual

const moment = jest.requireActual("moment");

export default (timestamp = 0) => {
  return moment(timestamp);
};
