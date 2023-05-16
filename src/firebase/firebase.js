// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// export const IS_DEV = process.env.NODE_ENV === 'development';

const firebaseConfig = {
  apiKey: "AIzaSyB2eGIi1Iy3rVVwxECNB3zmVORAYLs5i1c",
  authDomain: "explore2-ae1eb.firebaseapp.com",
  databaseURL: "https://explore2-ae1eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "explore2-ae1eb",
  storageBucket: "explore2-ae1eb.appspot.com",
  messagingSenderId: "935773895131",
  appId: "1:935773895131:web:6b4250ad719605788a0ffe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDatabase = getDatabase(app);

export { auth, app, fireDatabase };

//firebase config
