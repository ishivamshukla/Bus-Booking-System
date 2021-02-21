import * as firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyDuG7uTY_uMt5DdXCyV_Za1W6GuCBQv4bk",
    authDomain: "busbookingsystem-8b051.firebaseapp.com",
    databaseURL: "https://busbookingsystem-8b051.firebaseio.com",
    projectId: "busbookingsystem-8b051",
    storageBucket: "busbookingsystem-8b051.appspot.com",
    messagingSenderId: "615469306755",
    appId: "1:615469306755:web:ca5b113b1e997eae169cb6"
  };
  // Initialize Firebase
 const app=firebase.initializeApp(firebaseConfig);
 export default app;
 