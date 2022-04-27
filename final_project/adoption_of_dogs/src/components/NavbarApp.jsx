import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../pages/routingAppPages';
import { useSelector, useDispatch } from 'react-redux';
import { logOut as logOutAction } from '../redux/userConncection';
import * as Icon from 'react-bootstrap-icons';
//import './Navbar.css';

function logOut(dispatch) {
  let text = 'אתה בטוח שאתה רוצה להתנתק';
  if (window.confirm(text) === true) {
    dispatch(logOutAction({ key: 'email', value: '' }));
    localStorage.setItem('User', '');
  }
}
const NavbarApp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar bg-dark">
        <div className="container-fluid">
          <div className="" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/">
                  <Icon.HouseDoorFill />
                  בית
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link" to="/AdoptionDogs">
                  <Icon.BookHalf />
                  אימוץ כלבים&nbsp;
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="userAccount">
            {user.obj.email === '' ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/CreateUser">
                    <Icon.PersonLinesFill />
                    יצירת משתמש&nbsp;
                  </NavLink>
                </li>
                <br />
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    <Icon.PersonLinesFill />
                    כניסה לחשבון&nbsp;
                  </NavLink>
                </li>
              </ul>
            ) : (
              <NavLink
                className="nav-link"
                onClick={() => logOut(dispatch)}
                to="/"
              >
                <Icon.DoorOpenFill />
                יציאה
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavbarApp;
