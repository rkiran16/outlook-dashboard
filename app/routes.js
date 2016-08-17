/**
 * Created by rkanculakunta on 2/17/16.
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/home';
import MeetingDetails from './components/details';


export const DETAILS_ROUTE = "details";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path={DETAILS_ROUTE} component={MeetingDetails}/>
    </Route>
);
