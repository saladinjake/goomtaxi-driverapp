/* eslint-disable import/no-named-as-default */



import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


import DriverRoutes from "./Driver/DriverRoutes"

const AppRoutes = () =>{
    return (
      <>
         <DriverRoutes/>
      </>
    )
}

export default AppRoutes

