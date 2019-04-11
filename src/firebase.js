import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

export function Firebase() {
    app.initializeApp(config);

    const auth = app.auth();
    const db = app.database();

    return {
        auth,
        db,
        registerUser: (email, password) =>
            auth.createUserWithEmailAndPassword(email, password),
        signIn: (email, password) =>
            auth.signInWithEmailAndPassword(email, password),
        signOut: () => auth.signOut(),
        resetPassword: email => auth.sendPasswordResetEmail(email),
        updatePassword: password => auth.currentUser.updatePassword(password),
        user: uid => db.ref(`users/${uid}`),
        users: () => db.ref('users')
    };
}

export const FirebaseContext = React.createContext(null);
