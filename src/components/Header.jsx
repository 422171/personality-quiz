import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <h1>Personality Quiz</h1>
            <p>Know which element you are</p>
            <p>(Based on completely random things)</p>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </nav>
        </header>
    );
};

