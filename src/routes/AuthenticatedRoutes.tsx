import React from 'react';
import routes from 'constants/routes';
import { Route } from 'react-router';
import Profiles from 'pages/Profiles/Profiles';
import Products from 'pages/Products/Products';
import Proxies from 'pages/Proxies/Proxies';
import Tasks from 'pages/Tasks/Tasks';

const AuthenticatedRoutes = () => (
  <>
    <Route exact path={routes.tasks} component={Tasks} />
    <Route path={routes.products + '/:id'} component={Products} />
    <Route exact path={routes.products} component={Products} />
    <Route path={routes.profiles + '/:id'} component={Profiles} />
    <Route exact path={routes.profiles} component={Profiles} />
    <Route path={routes.proxies + '/:id'} component={Proxies} />
    <Route exact path={routes.proxies} component={Proxies} />
  </>
);

export default AuthenticatedRoutes;
