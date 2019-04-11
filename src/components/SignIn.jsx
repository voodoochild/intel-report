import React, { useState } from 'react';

export function SignIn() {
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    function onChange(e) {
        setState({
            ...state,
            ...{ [e.target.name]: e.target.value }
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(state);
    }

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    onChange={onChange}
                    placeholder="drmurphy@miskatonic.edu"
                    type="email"
                    value={state.email}
                />
                <input
                    name="password"
                    onChange={onChange}
                    placeholder="Password"
                    type="password"
                    value={state.password}
                />
                <button type="submit">Sign in</button>
            </form>
            <a href="/">Forgot password?</a>
        </React.Fragment>
    );
}
