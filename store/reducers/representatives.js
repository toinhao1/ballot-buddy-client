import {
	GET_CURRENT_REPS,
	GET_SELECTED_REP_CONTACT_INFO,
	GET_SELECTED_CANDIDATE_CONTACT_INFO,
} from '../actions/representatives';

const initialState = {
	reps: [],
	selectedRepInfo: {},
	selectedCandidateData: {},
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
				selectedRepInfo: {
					...state.selectedRepInfo,
					[action.name]: action.repData,
				},
			};
		case GET_SELECTED_CANDIDATE_CONTACT_INFO:
			return {
				...state,
				selectedCandidateData: {
					...state.selectedCandidateData,
					[action.name]: action.repData,
				},
			};
		default:
			return state;
	}
};
