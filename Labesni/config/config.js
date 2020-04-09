import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBcrP9LJXLtIPnrxNn7pBktJiIPqvCCd_E",
    authDomain: "labasniversion2.firebaseapp.com",
    databaseURL: "https://labasniversion2.firebaseio.com",
    projectId: "labasniversion2",
    storageBucket: "labasniversion2.appspot.com",
    messagingSenderId: "389060936051",
    appId: "1:389060936051:web:dba4e2ddd8acc79e4fc506",
    measurementId: "G-4CNJWF2VGJ"
};

firebase.initializeApp(config);
export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();