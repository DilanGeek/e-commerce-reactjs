import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCe88Oplkz60qQfvycXKYY8ps34rTgq4wc",
    authDomain: "crwn-bd-bc3a0.firebaseapp.com",
    databaseURL: "https://crwn-bd-bc3a0.firebaseio.com",
    projectId: "crwn-bd-bc3a0",
    storageBucket: "crwn-bd-bc3a0.appspot.com",
    messagingSenderId: "289029060127",
    appId: "1:289029060127:web:97ab7d17749573a4a5072a"
}

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;