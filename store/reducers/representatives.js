import {
	GET_CURRENT_REPS,
	GET_SELECTED_REP_CONTACT_INFO,
} from '../actions/representatives';

const initialState = {
	reps: [],
	selectedRepInfo: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CURRENT_REPS:
			return {
				...state,
				reps: action.payload,
			};
		case GET_SELECTED_REP_CONTACT_INFO:
			return {
				...state,
				selectedRepInfo: action.payload,
			};
		default:
			return state;
	}
};
