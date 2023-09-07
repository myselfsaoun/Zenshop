import { initializeApp } from "firebase/app";

const FIREBASE_API_KEY = "AIzaSyD4kwpr4MXiPSPnon_LI4scI_Gfn7dkgJA";
const FIREBASE_APP_ID = "1:378539980411:web:c6f7494f82828bbf63d4de";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "zenshop-a95d9.firebaseapp.com",
  projectId: "zenshop-a95d9",
  storageBucket: "zenshop-a95d9.appspot.com",
  messagingSenderId: "378539980411",
  appId: FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;