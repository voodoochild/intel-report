import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { FirebaseContext } from '../firebase';
import { Navigation } from './Navigation';
import { Landing } from './Landing';
import { Home } from './Home';
import { SignIn } from './SignIn';
import { Register } from './Register';
import { Account } from './Account';
import * as ROUTES from '../constants/routes';

const initialState = { authUser: null, loading: true };

export function App() {
    const [state, setState] = useState({ ...initialState });
    const firebase = useContext(FirebaseContext);

    let listener;

    useEffect(() => {
        listener = firebase.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                setState({ ...state, authUser, loading: false });
            } else {
                setState({ ...state, authUser: null, loading: false });
            }
        });

        return () => listener();
    }, []);

    return (
        <AuthUserContext.Provider value={state.authUser}>
            {state.loading ? (
                <p>Loading</p>
            ) : (
                <Router>
                    <Navigation />
                    <hr />
                    <Route exact path={ROUTES.LANDING} component={Landing} />
                    <Route path={ROUTES.HOME} component={Home} />
                    <Route path={ROUTES.SIGN_IN} component={SignIn} />
                    <Route path={ROUTES.REGISTER} component={Register} />
                    <Route path={ROUTES.ACCOUNT} component={Account} />
                </Router>
            )}
        </AuthUserContext.Provider>
    );
}
