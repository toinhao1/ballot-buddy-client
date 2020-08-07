import {
	GET_CURRENT_BALLOT,
	GETTING_SELECTED_MEASURE,
	GET_SELECTED_MEASURE_SUCCESS,
} from '../actions/ballot';

const initialState = {
	currentBallot: {},
	ballotMeasure: {},
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_BALLOT:
			return {
				...state,
				currentBallot: action.payload,
			};
		case GETTING_SELECTED_MEASURE:
			return {
				...state,
				loading: true,
			};
		case GET_SELECTED_MEASURE_SUCCESS:
			return {
				...state,
				ballotMeasure: action.payload,
			};
		default:
			return state;
	}
};
