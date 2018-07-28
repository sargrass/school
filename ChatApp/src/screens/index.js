import { Navigation } from 'react-native-navigation';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from '../reducers';
import CenterScreen from './center_screen';
import LeftDrawer from './left_drawer';
import RightDrawer from './right_drawer';

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export function registerScreens() {
	Navigation.registerComponent(
	  'chatapp.center_screen',
	  () => CenterScreen,
	  store,
	  Provider
	);
	Navigation.registerComponent(
	  'chatapp.left_drawer',
	  () => LeftDrawer,
	  store,
	  Provider
	);
	Navigation.registerComponent(
	  'chatapp.right_drawer',
	  () => RightDrawer,
	  store,
	  Provider
	);
}
