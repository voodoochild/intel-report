import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import { withRedirectIfAuthed } from '../session';
import * as ROUTES from '../constants/routes';

export const Register = withRedirectIfAuthed(() => {
    return (
        <React.Fragment>
            <h1>Register</h1>
            <RegisterForm />
        </React.Fragment>
    );
});

const initialState = {
    username: '',
    email: '',
    password1: '',
    password2: '',
    error: null
};

const RegisterForm = withRouter(props => {
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

        const { username, email, password1 } = state;

        try {
            const authUser = await firebase.registerUser(email, password1);
            await firebase.user(authUser.user.uid).set({ username, email });
            setState({ ...initialState });
            props.history.push(ROUTES.HOME);
        } catch (error) {
            setState({
                ...state,
                error
            });
        }
    }

    const { username, email, password1, password2, error } = state;
    const isInvalid =
        !password2.length ||
        password1 !== password2 ||
        !email.length ||
        !username.length;

    return (
        <form onSubmit={onSubmit}>
            <label>
                Username
                <input
                    name="username"
                    onChange={onChange}
                    placeholder="rex"
                    type="text"
                    value={username}
                />
            </label>
            <label>
                Email
                <input
                    name="email"
                    onChange={onChange}
                    placeholder="drmurphy@miskatonic.edu"
                    type="email"
                    value={email}
                />
            </label>
            <label>
                Password
                <input
                    name="password1"
                    onChange={onChange}
                    placeholder="Password"
                    type="password"
                    value={password1}
                />
            </label>
            <label>
                Repeat password
                <input
                    name="password2"
                    onChange={onChange}
                    placeholder="Repeat password"
                    type="password"
                    value={password2}
                />
            </label>
            <button disabled={isInvalid} type="submit">
                Register
            </button>

            {error && <p>{error.message}</p>}
        </form>
    );
});

export function RegisterLink() {
    return (
        <p>
            <Link to={ROUTES.REGISTER}>Register</Link>
        </p>
    );
}
