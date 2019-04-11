import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';

const config = {};

export function Firebase() {
    app.initializeApp(config);

    const auth = app.auth();

    return {
        auth,
        registerUser: (email, password) =>
            auth.createUserWithEmailAndPassword(email, password),
        signIn: (email, password) =>
            auth.signInWithEmailAndPassword(email, password),
        signOut: () => auth.signOut(),
        resetPassword: email => auth.sendPasswordResetEmail(email),
        updatePassword: password => auth.currentUser.updatePassword(password)
    };
}

export const FirebaseContext = React.createContext(null);
