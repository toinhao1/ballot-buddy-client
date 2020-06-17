import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './profile';
import repReducer from './representatives';

export const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	representatives: repReducer,
});
