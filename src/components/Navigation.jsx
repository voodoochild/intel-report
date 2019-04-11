import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthUserContext } from '../session';
import { FirebaseContext } from '../firebase';
import * as ROUTES from '../constants/routes';

export function Navigation() {
    const authUser = useContext(AuthUserContext);

    return authUser ? <SignedInNav /> : <AnonymousNav />;
}

function AnonymousNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.SIGN_IN}>Sign in</Link>
                </li>
            </ul>
        </nav>
    );
}

const SignedInNav = withRouter(props => {
    const firebase = useContext(FirebaseContext);

    function signOut() {
        firebase.signOut();
        props.history.push(ROUTES.LANDING);
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
                <li>
                    <button type="button" onClick={signOut}>
                        Sign out
                    </button>
                </li>
            </ul>
        </nav>
    );
});
