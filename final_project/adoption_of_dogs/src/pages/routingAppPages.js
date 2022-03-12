import React from 'react';
import '../App.css';
import { Route, Routes } from 'react-router-dom';
import CreateUser from '../pages/CreateUser';
import Home from '../pages/Home';
import Login from '../pages/LogIn';
import AdoptionDogs from './AdoptionDogs';
import NOTFOUND from '../pages/NotFound';
const AllRoutes = () => {
  return (
    <div className="allRoutes">
      <Routes>
        {/*Route of home page.*/}
        <Route id="Home" path="/" exact element={<Home />}></Route>
        {/*Route of createUser page.*/}
        <Route
          id="CreateUser"
          path="/CreateUser"
          element={<CreateUser />}
        ></Route>
        {/*Route of login page.*/}
        <Route id="Login" path="/Login" element={<Login />}></Route>
        {/*Route of menu page.*/}
        <Route
          id="AdoptionDogs"
          path="/AdoptionDogs"
          element={<AdoptionDogs />}
        ></Route>
        {/*Route of NOTFOUND page.*/}
        <Route path="*" element={<NOTFOUND />} />
      </Routes>
    </div>
  );
};
export default AllRoutes;
/* */
