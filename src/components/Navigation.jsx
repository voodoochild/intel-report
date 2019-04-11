import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../session';
import * as ROUTES from '../constants/routes';

export function Navigation() {
    const authUser = useContext(AuthUserContext);

    return (
        <nav>
            <ul>
                {!authUser && (
                    <li>
                        <Link to={ROUTES.SIGN_IN}>Sign in</Link>
                    </li>
                )}
                {authUser && (
                    <li>
                        <a>Sign out</a>
                    </li>
                )}
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.ACCOUNT}>Account</Link>
                </li>
            </ul>
        </nav>
    );
}
