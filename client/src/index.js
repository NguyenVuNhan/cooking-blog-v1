import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import jwt_decode from "jwt-decode";

import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { setCurrentUser, logoutRequest } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(...middleware),
		process.env.NODE_ENV === "production"
			? f => f
			: window.__REDUX_DEVTOOLS_EXTENSION__ &&
					window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	const decoded = jwt_decode(localStorage.jwtToken);
	store.dispatch(setCurrentUser(decoded));

	const currentTime = Date.now() / 1000;
	if (currentTime > decoded.exp) {
		store.dispatch(logoutRequest());

		window.location.href = "/login";
	}
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

sagaMiddleware.run(rootSaga);
serviceWorker.register();
