import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {BrowserRouter} from "react-router-dom";

import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import globalReducer from './Store/globalReducer';
import userReducer from './Store/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	global: globalReducer,
	user: userReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
const app = (
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
