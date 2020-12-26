import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid) => ({
  type: "LOGIN",
  uid,
});

// function untuk dispatch
export const startLogin = () => {
  // nggak perlu teruskan param dispatch di fun di bawah, krn nggak dipake
  // function ini akan dipanggil oleh redux thunk middleware dgn param dispatch
  return () => {
    return firebase.auth().signInWithPopup(googleAuthProvider);
  };
};

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
