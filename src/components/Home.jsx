import React from 'react';
import { withRequireAuth } from '../session';

export const Home = withRequireAuth(() => {
    return (
        <div>
            <h1>Home</h1>
            <p>This is where you can create, delete or load a campaign.</p>
        </div>
    );
});
