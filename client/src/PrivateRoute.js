import React from "react";
import { Route, Redirect } from "react-router-dom";
// TODO: Check that local storage auth token is valid
function PrivateRoute ({component: Component, redirectTo,...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => (localStorage.getItem("Authorization") != undefined)
          ? <Component {...props} key={localStorage.getItem("Authorization")}/>
          : <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />}
      />
    )
  }

export { PrivateRoute }