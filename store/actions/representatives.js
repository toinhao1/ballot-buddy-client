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

export const getSelectedRepContactInfo = (data, isForBallot) => async (
	dispatch
) => {
	const response = await axios.post(
		`${endpoints.apiUrl}current-representative/office-data`,
		{ data, isForBallot }
	);
	const { addressData, additionalData, newsArticles } = response.data;

	let webSiteObject = {};
	if (Array.isArray(addressData.webaddress.address)) {
		addressData.webaddress.address.forEach((webSite) => {
			webSiteObject[webSite.webAddressType] = webSite.webAddress;
		});
	} else {
		webSiteObject[addressData.webaddress.address.webAddressType] =
			addressData.webaddress.address.webAddress;
	}
	console.log(
		addressData.webaddress.address,
		Array.isArray(addressData.webaddress.address)
	);
	const repData = {
		address: addressData?.office?.address || null,
		phoneNumber: addressData?.office?.phone?.phone1 || null,
		webAddresses: webSiteObject,
		// If the data is in an array slice the first 5 elements otherwise return the object in an array
		politicalExperience: Array.isArray(additionalData.political.experience)
			? additionalData.political.experience.slice(0, 5)
			: [additionalData.political.experience] || '',
		// If the data is in an array slice the first 5 elements otherwise return the object in an array

		professionalExperience: Array.isArray(
			additionalData.professional.experience
		)
			? additionalData.professional.experience.slice(0, 5)
			: [additionalData.professional.experience] || '',
		newsArticles: newsArticles.articles,
	};
	dispatch(sendSelectedRepData(repData));
};
