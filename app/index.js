import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';

import reducers from './reducers';
//*********** STYLE SHEETS ****************/
require('./assets/styles/sass/main.scss');

//*********** CONSTANTS *******************/
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

//************* Render App ****************/
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>
    , document.querySelector('.container'));
