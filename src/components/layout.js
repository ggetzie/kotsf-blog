import React from "react"
import { Link } from "gatsby"

export default ({ children }) => (
    <div className="container">
        <div className="entry">
            {children}
        </div>
        <section className="sidebar">
            <Link to="/"><h1>KotSF</h1></Link>
            <p className="tagline">Tagline</p>
            <nav className="navigation">
                <ul>
                    <li>
                        <Link to="/about/">About</Link>
                    </li>
                    <li>
                        <Link to="/archive/">Archive</Link>
                    </li>
                    <li>
                        <Link to="/portfolio/">Portfolio</Link>
                    </li>
                    <li>
                        <Link to="/contact/">Contact</Link>
                    </li>
                </ul>
            </nav>
        </section>
    </div>
)