import * as firebase from 'firebase';
import firebaseConfig from 'constants/firebase';

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebase;
