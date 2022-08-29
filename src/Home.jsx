import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <div className='navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                to='/recepie-book'
                className='nav-link active'
                aria-current='page'
              >
                create user
              </Link>{" "}
              |{" "}
            </li>
            <li className='nav-item'>
              <Link to='/recepie' className='nav-link'>
                Recepies
              </Link>{" "}
              |{" "}
            </li>
            <li className='nav-item'>
              <Link to='/shopping' className='nav-link'>
                shopping list
              </Link>{" "}
              |{" "}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
