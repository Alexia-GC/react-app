import React  from "react";
import CartWidget from "../CartWidget";
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to='/' className='navbar-brand'>
                    <img src="img/logo-rezise.png" alt="logo" />
                 </Link>
                <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link effect-underline">Inicio</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={`/category/cabanel`} className="nav-link effect-underline">Alexandre Cabanel</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={`/category/collier`}  className="nav-link effect-underline">John Collier</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={`/category/sargent`}  className="nav-link effect-underline">John Sargent</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={`/cart`}  className="nav-link effect-underline"><CartWidget /></Link>
                        </li>
                    </ul>         

                </div>
                
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav>
  );
};