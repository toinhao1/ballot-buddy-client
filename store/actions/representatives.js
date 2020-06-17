import axios from 'axios';

import endpoints from '../../endpoints';

// Constants
export const GET_CURRENT_REPS = 'GET_CURRENT_REPS';

// reducer actions
export const sendData = (data) => {
	return {
		type: GET_CURRENT_REPS,
		payload: data,
	};
};

// functional actions
export const getCurrentRepresentatives = () => async (dispatch) => {
	const response = await axios.get(
		`${endpoints.apiUrl}current-representatives`
	);
	dispatch(sendData(response.data.data));
};
