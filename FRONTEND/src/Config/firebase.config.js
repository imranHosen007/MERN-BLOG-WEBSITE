import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA1N6rBf9w6itNLzsOthcz_g0P_0BkUAgw",
  authDomain: "blog-website-ca86e.firebaseapp.com",
  projectId: "blog-website-ca86e",
  storageBucket: "blog-website-ca86e.appspot.com",
  messagingSenderId: "263364613924",
  appId: "1:263364613924:web:7007dbc80eaefa8d8945b1",
  measurementId: "G-HXZ815ECD9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const goolgeProvider = new GoogleAuthProvider();
const auth = getAuth(app);
export const googleLogin = async () => {
  return signInWithPopup(auth, goolgeProvider)
    .then()
    .catch(error => console.log(error));
};
