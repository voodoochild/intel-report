import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from './constants/routes';

export const AuthUserContext = React.createContext(null);

export function withRequireAuth(Component) {
    return withRouter(props => {
        const authUser = useContext(AuthUserContext);

        useEffect(() => {
            if (authUser === null) {
                props.history.push(ROUTES.SIGN_IN);
            }
        }, [authUser]);

        return <Component {...props} />;
    });
}

export function withRedirectIfAuthed(Component) {
    return withRouter(props => {
        const authUser = useContext(AuthUserContext);

        useEffect(() => {
            if (authUser !== null) {
                props.history.replace(ROUTES.HOME);
            }
        }, [authUser]);

        return <Component {...props} />;
    });
}
