import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, isLoggedIn, user, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn && user.isAdmin ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  user: state.authReducer.user.user,
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps)(AdminRoute);
