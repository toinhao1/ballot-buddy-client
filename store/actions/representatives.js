import axios from 'axios';

import endpoints from '../../endpoints';

// Constants
export const GET_CURRENT_REPS = 'GET_CURRENT_REPS';
export const GET_SELECTED_REP_CONTACT_INFO = 'GET_SELECTED_REP_CONTACT_INFO';

// reducer actions
export const sendCurrentReps = (data) => {
	return {
		type: GET_CURRENT_REPS,
		payload: data,
	};
};

export const sendSelectedRepData = (data) => {
	return {
		type: GET_SELECTED_REP_CONTACT_INFO,
		payload: data,
	};
};

// functional actions
export const getCurrentRepresentatives = () => async (dispatch) => {
	const response = await axios.get(
		`${endpoints.apiUrl}current-representatives`
	);
	dispatch(sendCurrentReps(response.data.data));
};

export const getSelectedRepContactInfo = (candidateId) => async (dispatch) => {
	const response = await axios.post(
		`${endpoints.apiUrl}current-representative/office-data`,
		{ candidateId }
	);
	let webSiteObject = {};
	if (response.data.addressData.webaddress.address) {
		response.data.addressData.webaddress.address.forEach((webSite) => {
			webSiteObject[webSite.webAddressType] = webSite.webAddress;
		});
	}

	const repData = {
		address: response.data.addressData?.office?.address || null,
		phoneNumber: response.data.addressData?.office?.phone?.phone1 || null,
		webAddresses: webSiteObject,
		// If the data is in an array slice the first 5 elements otherwise return the object in an array
		politicalExperience: Array.isArray(
			response.data.additionalData.political.experience
		)
			? response.data.additionalData.political.experience.slice(0, 5)
			: [response.data.additionalData.political.experience] || '',
		// If the data is in an array slice the first 5 elements otherwise return the object in an array

		professionalExperience: Array.isArray(
			response.data.additionalData.professional.experience
		)
			? response.data.additionalData.professional.experience.slice(0, 5)
			: [response.data.additionalData.professional.experience] || '',
		newsArticles: response.data.newsArticles.articles,
	};
	dispatch(sendSelectedRepData(repData));
};
