import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { appReducer } from './appReducer';

import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(appReducer, composeWithDevTools(applyMiddleware(thunk)));
