import axios from 'axios';

import endpoints from '../../endpoints';

// Constants
export const SET_ADDRESS = 'SET_ADDRESS';

export const sendData = (address) => {
	return {
		type: SET_ADDRESS,
		address,
	};
};

export const setAddress = (address) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}address`, address);

	if (response.data.status === 400) {
		throw new Error(response.data.error);
	}
	dispatch(sendData(address));
};
