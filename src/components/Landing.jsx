import React from 'react';
import { withRedirectIfAuthed } from '../session';

export const Landing = withRedirectIfAuthed(() => {
    return (
        <div>
            <h1>Landing</h1>
            <p>
                Here's a summary of what the app is, why it's cool, and why you
                should register for an account or sign in in order to use it.
            </p>
        </div>
    );
});
