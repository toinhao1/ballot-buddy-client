import axios from 'axios';

import endpoints from '../../endpoints';

// Redux constants
export const SEND_USER_ADDRESS = 'SEND_USER_ADDRESS';
export const SEND_USER_PROFILE = 'SEND_USER_PROFILE';

// reducer actions
export const sendAddress = (data) => {
	return {
		type: SEND_USER_ADDRESS,
		payload: data,
	};
};

export const sendUserProfile = (data) => {
	return {
		type: SEND_USER_PROFILE,
		payload: data,
	};
};

// functioanl actions
export const setAddress = (address) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}set-address`, address);
	if (response.data.status === 400) {
		throw new Error(response.data.error);
	}
	dispatch(sendAddress(address));
};

export const getProfile = () => async (dispatch, getState) => {
	const response = await axios.get(`${endpoints.apiUrl}user-profile`);

	const resData = response.data;

	if (resData.status === 400) {
		throw new Error(resData.error);
	}
	dispatch(sendUserProfile(resData.user));
};
