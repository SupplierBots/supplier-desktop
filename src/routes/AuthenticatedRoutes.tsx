import React from 'react';
import routes from 'constants/routes';
import { Route } from 'react-router';
import Profiles from 'pages/Profiles/Profiles';
import Proxies from 'pages/Proxies/Proxies';
import Tasks from 'pages/Tasks/Tasks';
import Dashboard from 'pages/Dashboard/Dashboard';
import Settings from 'pages/Settings/Settings';
import Update from 'pages/Update/Update';

const AuthenticatedRoutes = () => (
  <>
    <Route path={routes.dashboard} component={Dashboard} />
    <Route path={routes.tasks} component={Tasks} />
    <Route path={routes.profiles + '/:id'} component={Profiles} />
    <Route exact path={routes.profiles} component={Profiles} />
    <Route path={routes.proxies + '/:id'} component={Proxies} />
    <Route exact path={routes.proxies} component={Proxies} />
    <Route exact path={routes.settings} component={Settings} />
    <Route exact path={routes.update} component={Update} />
  </>
);

export default AuthenticatedRoutes;
