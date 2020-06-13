import { SEND_USER_ADDRESS, SEND_USER_PROFILE } from '../actions/profile';

const initialState = {
	userAddress: {},
	user: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SEND_USER_ADDRESS:
			return {
				...state,
				userAdress: action.payload,
				user: { ...state.user, [state.user.address]: action.payload },
			};
		case SEND_USER_PROFILE:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
