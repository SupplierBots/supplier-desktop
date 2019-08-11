import React from 'react';
import routes from 'constants/routes';
import { Route } from 'react-router';
import Profiles from 'pages/Profiles/Profiles';
import Products from 'pages/Products/Products';

const AuthenticatedRoutes = () => (
  <>
    <Route path={routes.profiles + '/:id'} component={Profiles} />
    <Route exact path={routes.profiles} component={Profiles} />
    <Route path={routes.products + '/:id'} component={Products} />
    <Route exact path={routes.products} component={Products} />
  </>
);

export default AuthenticatedRoutes;
