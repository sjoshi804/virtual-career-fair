import React from "react";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute ({component: Component, redirectTo,...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => (localStorage.getItem("Authorization") !== undefined)
          ? <Component {...props} />
          : <Redirect to={{pathname: redirectTo, state: {from: props.location}}} />}
      />
    )
  }

export { PrivateRoute }