
import * as firebase from 'firebase';

// should go in a secret file
const config = {
    apiKey: "AIzaSyDyHaEaZChGNfBy1QXrCJH7xnv-sIcLwU0",
    authDomain: "chatapp-3fd3c.firebaseapp.com",
    databaseURL: "https://chatapp-3fd3c.firebaseio.com",
    projectId: "chatapp-3fd3c",
    storageBucket: "chatapp-3fd3c.appspot.com",
    messagingSenderId: "742447065388"
};
firebase.initializeApp(config);

export default firebase;
