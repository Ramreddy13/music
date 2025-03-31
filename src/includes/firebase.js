import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB13eoe8QeFgL3kx4zmt7FfXHQ9nEzwO7A",
  authDomain: "music-3ca67.firebaseapp.com",
  projectId: "music-3ca67",
  storageBucket: "music-3ca67.firebasestorage.app",
  appId: "1:583401014433:web:9a41e5c0d91c769d97dce0",
  measurementId: "G-X90902DEYV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const userCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  userCollection,
  storage,
  songsCollection,
  commentsCollection,
};
