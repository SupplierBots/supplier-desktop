import React from 'react';
import routes from 'constants/routes';
import { Route, Switch } from 'react-router';
import Startup from 'pages/Startup/Startup';
import { useSelector } from 'hooks/useSelector';
import AuthenticatedRoutes from './AuthenticatedRoutes';

const Routes = () => {
  const authenticated = useSelector(state => state.auth.authenticated);

  return (
    <Switch>
      <Route path={routes.startup} component={Startup} />
      {authenticated && <AuthenticatedRoutes />}
    </Switch>
  );
};

export default Routes;
