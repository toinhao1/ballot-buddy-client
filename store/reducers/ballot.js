import { GET_CURRENT_BALLOT } from '../actions/ballot';

const initialState = {
	currentBallot: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_BALLOT:
			return {
				...state,
				currentBallot: action.payload,
			};
		default:
			return state;
	}
};
