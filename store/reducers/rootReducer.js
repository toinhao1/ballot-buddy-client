import { combineReducers } from 'redux';
import authReducer from './auth';
import profileReducer from './profile';
import repReducer from './representatives';
import ballotReducer from './ballot';

export const rootReducer = combineReducers({
	auth: authReducer,
	profile: profileReducer,
	representatives: repReducer,
	ballot: ballotReducer,
});
