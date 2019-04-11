import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import { RegisterLink } from './Register';
import * as ROUTES from '../constants/routes';

const initialState = {
    email: '',
    password: '',
    error: null
};

export function SignIn() {
    return (
        <React.Fragment>
            <h1>Sign in</h1>
            <SignInForm />
            <RegisterLink />
        </React.Fragment>
    );
}

const SignInForm = withRouter(props => {
    const [state, setState] = useState({ ...initialState });
    const firebase = useContext(FirebaseContext);

    function onChange(e) {
        setState({
            ...state,
            ...{ [e.target.name]: e.target.value }
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        const { email, password } = state;

        try {
            await firebase.signIn(email, password);
            setState({ ...initialState });
            props.history.push(ROUTES.HOME);
        } catch (error) {
            setState({
                ...state,
                error
            });
        }
    }

    const { email, password, error } = state;
    const isInvalid = !email || !password;

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <label>
                    Email
                    <input
                        name="email"
                        onChange={onChange}
                        placeholder="drmurphy@miskatonic.edu"
                        type="email"
                        value={state.email}
                    />
                </label>
                <label>
                    Password
                    <input
                        name="password"
                        onChange={onChange}
                        placeholder="Password"
                        type="password"
                        value={state.password}
                    />
                </label>
                <button disabled={isInvalid} type="submit">
                    Sign in
                </button>
                {error && <p>{error.message}</p>}
            </form>
            <p>
                <Link to={ROUTES.FORGOT_PASSWORD}>Forgot password?</Link>
            </p>
        </React.Fragment>
    );
});
