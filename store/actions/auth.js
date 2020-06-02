import { AsyncStorage } from 'react-native';
import axios from 'axios';
import { startAsync } from 'expo/build/AR';

// Constants
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const authenticate = (token, userId) => (dispatch) => {
	dispatch({ type: AUTHENTICATE, userId, token });
};

export const signUp = (email, password) => async (dispatch) => {
	console.log('here');
	const response = await axios.post('https://10.0.2.2/user/sign-up', {
		email,
		password,
	});

	console.log(response);
	if (!response.ok) {
		const errResData = await response.json();
		const errorId = errResData.error.message;
		let message = 'Something went wrong';

		if (errorId === 'EMAIL_EXISTS') {
			message = 'This email already exists.';
		}
		throw new Error(message);
	}

	const resData = await response.json();

	dispatch(authenticate(resData.idToken, resData.localId));
	saveDataToStorage(resData.idToken, resData.localId);
};

export const login = (email, password) => async (dispatch) => {
	const response = await axios.post('https://10.0.2.2/user/login', {
		email,
		password,
	});
	console.log(response);

	if (!response.ok) {
		const errResData = await response.json();
		const errorId = errResData.error.message;
		let message = 'Something went wrong';

		if (errorId === 'EMAIL_NOT_FOUND') {
			message = 'This email could not be found';
		} else if (errorId === 'INVALID_PASSWORD') {
			message = 'Invlaid password entered';
		}
		throw new Error(message);
	}
	const resData = await response.json();

	dispatch(authenticate(resData.idToken, resData.localId));

	saveDataToStorage(resData.idToken, resData.localId);
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
