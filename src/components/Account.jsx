import React from 'react';
import { withRequireAuth } from '../session';

export const Account = withRequireAuth(() => {
    return (
        <div>
            <h1>Account</h1>
        </div>
    );
});
