import { AsyncStorage } from 'react-native';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';
import endpoints from '../../endpoints';

// Constants
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId, address) => (dispatch) => {
	dispatch({ type: AUTHENTICATE, userId, token, address });
	setAuthToken(token);
};

export const signUp = (email, password) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}sign-up`, {
		email,
		password,
	});

	if (response.data.status === 400) {
		throw new Error(response.data.error);
	} else {
		dispatch(login(email, password));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}login`, {
		email,
		password,
	});
	const resData = response.data;

	if (resData.status === 400) {
		throw new Error(resData.error);
	}

	dispatch(authenticate(resData.token, resData.userId, resData?.address));
	saveDataToStorage(resData.token, resData.userId, !!resData?.address);
};

const saveDataToStorage = (token, userId, address) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
			hasAddress: address,
		})
	);
};

export const logout = () => {
	AsyncStorage.removeItem('userData');
	setAuthToken(false);
	return { type: LOGOUT };
};
