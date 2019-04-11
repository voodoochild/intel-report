import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

    function AnonRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    state.authUser !== null ? (
                        <Redirect to={ROUTES.HOME} />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        );
    }

    function AuthedRoute({ component: Component, ...rest }) {
        return (
            <Route
                {...rest}
                render={props =>
                    state.authUser === null ? (
                        <Redirect to={ROUTES.SIGN_IN} />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        );
    }

    return (
        <AuthUserContext.Provider value={state.authUser}>
            {state.loading ? (
                <p>Loading</p>
            ) : (
                <Router>
                    <Navigation />
                    <hr />
                    <AnonRoute
                        exact
                        path={ROUTES.LANDING}
                        component={Landing}
                    />
                    <AnonRoute path={ROUTES.SIGN_IN} component={SignIn} />
                    <AnonRoute path={ROUTES.REGISTER} component={Register} />
                    <AuthedRoute path={ROUTES.HOME} component={Home} />
                    <AuthedRoute path={ROUTES.ACCOUNT} component={Account} />
                </Router>
            )}
        </AuthUserContext.Provider>
    );
}
