import { GET_CURRENT_REPS } from '../actions/representatives';

const initialState = {
	reps: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_REPS:
			return {
				...state,
				reps: action.payload,
			};
		default:
			return state;
	}
};
