import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const UserRoute = ({
  component: Component,
  isLoggedIn,
  ...rest
}) => (
  <Route
      {...rest}
      render={props => (
        isLoggedIn
          ? <Component {...props} />
          : (<Redirect to="/" />))}
    />
  );

const mapStateToProps = state => ({
  user: state.authReducer.user.user,
  isLoggedIn: state.authReducer.isLoggedIn
});

export default connect(mapStateToProps)(UserRoute);