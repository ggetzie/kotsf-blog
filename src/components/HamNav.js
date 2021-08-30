import React from 'react';

export default function HamNav({ children }) {
    return(
        <nav id="ham_nav">
            <label htmlFor="hamburger">&#9776;</label>
            <input type="checkbox" id="hamburger" />
            <div id="ham_items">
                {children}
            </div>
        </nav>
    )
}