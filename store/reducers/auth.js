import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
	token: null,
	isLoggedIn: false,
	userId: null,
	userAddress: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				token: action.token,
				userId: action.userId,
				userAdress: action.address,
				isLoggedIn: true,
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				userId: null,
				isLoggedIn: false,
			};
		default:
			return state;
	}
};
