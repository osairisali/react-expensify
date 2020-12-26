import authReducer from "../../reducers/auth";

test("should add uid to auth state", () => {
  const action = {
    type: "LOGIN",
    uid: "abs",
  };
  const state = authReducer(undefined, action);

  expect(state).toEqual({
    uid: action.uid,
  });
});

test("should remove uid in auth state", () => {
  const action = {
    type: "LOGOUT",
  };
  const state = authReducer(undefined, action);

  expect(state).toEqual({});
});
