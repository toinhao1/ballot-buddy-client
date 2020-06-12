import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './profile';

export const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
});
