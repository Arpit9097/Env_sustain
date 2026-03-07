import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBxtVGs_JLL9C9dZiOk3rqxV8GnWLw1AmE",
  authDomain: "sustainai-8d8b7.firebaseapp.com",
  projectId: "sustainai-8d8b7",
  storageBucket: "sustainai-8d8b7.firebasestorage.app",
  messagingSenderId: "790978217958",
  appId: "1:790978217958:web:85a025d880b1094b8a7827",
  measurementId: "G-63EVMLP7DR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
export default app;
