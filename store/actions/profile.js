import axios from 'axios';

import endpoints from '../../endpoints';

// Redux constants
export const SEND_USER_ADDRESS = 'SEND_USER_ADDRESS';
export const SEND_USER_PROFILE = 'SEND_USER_PROFILE';
export const SEND_USER_EDITS = 'SEND_USER_EDITS';

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

export const sendUserEdits = (data) => {
	return {
		type: SEND_USER_EDITS,
		payload: data,
	};
};

// functioanl actions
export const setAddress = (address) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}set-address`, address);
	dispatch(sendAddress(address));
};

export const getProfile = () => async (dispatch) => {
	const response = await axios.get(`${endpoints.apiUrl}user-profile`);

	const resData = response.data;
	dispatch(sendUserProfile(resData.user));
};

export const editUser = (email) => async (dispatch) => {
	const response = await axios.put(`${endpoints.apiUrl}edit-user`, {
		email,
	});
	dispatch(sendUserEdits(email));
};
