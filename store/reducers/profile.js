import { SET_ADDRESS } from '../actions/auth';

const initialState = {
	userAddress: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ADDRESS:
			return {
				...state,
				userAdress: action.address,
			};
		default:
			return state;
	}
};
