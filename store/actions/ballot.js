import axios from 'axios';
import endpoints from '../../endpoints';

export const GET_CURRENT_BALLOT = 'GET_CURRENT_BALLOT';
export const GETTING_SELECTED_MEASURE = 'GETTING_SELECTED_MEASURE';
export const GET_SELECTED_MEASURE_SUCCESS = 'GET_SELECTED_MEASURE_SUCCESS';
export const GET_SELECTED_MEASURE_FAILURE = 'GET_SELECTED_MEASURE_FAILURE';

export const sendCurrentBallot = (data) => {
	return {
		type: GET_CURRENT_BALLOT,
		payload: data,
	};
};

export const startGettingBallotMeasure = () => {
	return {
		type: GETTING_SELECTED_MEASURE,
	};
};

export const gotBallotMeasureSuccess = (data) => {
	return {
		type: GET_SELECTED_MEASURE_SUCCESS,
		payload: data,
	};
};

export const getBallotMeasureFailure = (err) => {
	return {
		type: GET_SELECTED_MEASURE_FAILURE,
		payload: err,
	};
};

// functional actions
export const getCurrentBallot = () => async (dispatch) => {
	const response = await axios.get(`${endpoints.apiUrl}current-ballot`);

	dispatch(sendCurrentBallot(response.data.ballot));
};

export const getMeasureDetails = () => async (dispatch) => {
	dispatch(startGettingBallotMeasure());
	try {
		const response = await axios.get(`${endpoints.apiUrl}selected-measure`);

		dispatch(gotBallotMeasureSuccess(response.data));
	} catch (err) {
		dispatch(getBallotMeasureFailure());
	}
};
