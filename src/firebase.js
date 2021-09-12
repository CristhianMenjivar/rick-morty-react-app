import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW6PU3c-9n0tTfRuoJTIbQdcXNnHIrZYk",
  authDomain: "react-graphql-d7aa2.firebaseapp.com",
  projectId: "react-graphql-d7aa2",
  storageBucket: "react-graphql-d7aa2.appspot.com",
  messagingSenderId: "828308201041",
  appId: "1:828308201041:web:9c2d349c2c34259ff56270",
};

const app = firebase.initializeApp(firebaseConfig);

const dbFirebase = firebase.firestore().collection("favorites");

export const getAllFavoritesFromDB = async (uid) => {
  try {
    const res = await dbFirebase.doc(uid).get();

    const getData = res.data();

    if (!getData?.favorites) {
      return {
        favorites: [],
      };
    }

    const { favorites = [] } = getData;

    return {
      favorites,
    };
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
};

export const updateDBFavorites = async (favorites = [], uid) => {
  try {
    await dbFirebase.doc(uid).set({ favorites });
  } catch (error) {
    console.error(error);
  }
};

const loginWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const res = await firebase.auth().signInWithPopup(provider);

    if (res.user) return res.user;
    else return null;
  } catch (_error) {
    return null;
  }
};

export const logoutGoogleAccount = () => {
  try {
    firebase.auth(app).signOut();
  } catch (_error) {
    console.debug(_error);
  }
};

export default loginWithGoogle;
