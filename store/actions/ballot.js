export const GET_CURRENT_BALLOT = 'GET_CURRENT_BALLOT';

export const sendCurrentBallot = (data) => {
	return {
		type: GET_CURRENT_BALLOT,
		payload: data,
	};
};

// functional actions

export const getCurrentBallot = () => async (dispatch) => {
	const response = await axios.get(
		`${endpoints.apiUrl}current-representatives/ballot`
	);
	dispatch(sendCurrentBallot(response.data.data));
};
