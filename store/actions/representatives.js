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

export const sendSelectedRepData = (repData, name) => {
	return {
		type: GET_SELECTED_REP_CONTACT_INFO,
		repData,
		name,
	};
};

// functional actions
export const getCurrentRepresentatives = () => async (dispatch) => {
	const response = await axios.get(`${endpoints.apiUrl}current-representatives`);
	dispatch(sendCurrentReps(response.data.data));
};

export const getSelectedRepContactInfo = (data, isForBallot) => async (dispatch) => {
	const response = await axios.post(`${endpoints.apiUrl}current-representative/office-data`, {
		data,
		isForBallot,
	});
	const { addressData, additionalData, newsArticles } = response.data;

	let webSiteObject = {};
	if (addressData.webaddress && Array.isArray(addressData.webaddress.address)) {
		addressData.webaddress.address.forEach((webSite) => {
			webSiteObject[webSite.webAddressType] = webSite.webAddress;
		});
	} else if (addressData.webaddress && addressData.webaddress.address.webAddress) {
		webSiteObject[addressData.webaddress.address.webAddressType] =
			addressData.webaddress.address.webAddress;
	}

	let politicalData = '';
	if (Array.isArray(additionalData.political.experience)) {
		politicalData = additionalData.political.experience.slice(0, 5);
	} else if (additionalData.political.experience !== undefined) {
		politicalData = [additionalData.political.experience];
	}

	let professionalData = '';
	if (Array.isArray(additionalData.professional.experience)) {
		professionalData = additionalData.professional.experience.slice(0, 5);
	} else if (additionalData.professional.experience !== undefined) {
		professionalData = [additionalData.professional.experience];
	}

	const repData = {
		address: addressData?.office?.address || null,
		phoneNumber: addressData?.office?.phone?.phone1 || null,
		webAddresses: webSiteObject,
		politicalExperience: politicalData,
		professionalExperience: professionalData,
		newsArticles: newsArticles.articles || null,
		candidateId: additionalData.candidateId,
	};
	dispatch(sendSelectedRepData(repData, data.name));
};
