import { AsyncStorage } from 'react-native';
import axios from 'axios';

// Constants
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId) => (dispatch) => {
	dispatch({ type: AUTHENTICATE, userId, token });
};

export const signUp = (email, password) => async (dispatch) => {
	const response = await axios.post('http://192.168.1.5:5000/user/sign-up', {
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
	const response = await axios.post('http://192.168.1.5:5000/user/login', {
		email,
		password,
	});
	console.log(response);
	const resData = response.data;

	if (resData.status === 400) {
		throw new Error(resData.error);
	}

	dispatch(authenticate(resData.token, resData.userId));
	saveDataToStorage(resData.token, resData.userId);
};

const saveDataToStorage = (token, userId) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token,
			userId,
		})
	);
};

export const logout = () => {
	AsyncStorage.removeItem('userData');
	return { type: LOGOUT };
};
