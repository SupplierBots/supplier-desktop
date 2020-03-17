import React from 'react';
import routes from 'constants/routes';
import { Route, Switch } from 'react-router';
import Startup from 'pages/Startup/Startup';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import { useSelector } from 'react-redux';
import { AppState } from 'store/root';

const Routes = () => {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);

  return (
    <Switch>
      <Route path={routes.startup} component={Startup} />
      {authenticated && <AuthenticatedRoutes />}
    </Switch>
  );
};

export default Routes;
