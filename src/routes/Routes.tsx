import React from 'react';
import routes from 'constants/routes';
import { Route, Switch } from 'react-router';
import Startup from 'pages/Startup/Startup';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import { useStateSelector } from 'hooks/typedReduxHooks';

const Routes = () => {
  const authenticated = useStateSelector(state => state.auth.authenticated);

  return (
    <Switch>
      <Route path={routes.startup} component={Startup} />
      {authenticated && <AuthenticatedRoutes />}
    </Switch>
  );
};

export default Routes;
