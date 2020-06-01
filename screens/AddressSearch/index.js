import React from 'react';
import { Image, Text, processColor } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { styles } from './Styles';

const AddressSearch = () => {
	console.log(process.env.REACT_NATIVE_GOGGLE_PLACES_API_KEY);
	return (
		<GooglePlacesAutocomplete
			placeholder="Enter Address"
			placeholder="Enter Location"
			minLength={2}
			autoFocus={false}
			returnKeyType={'default'}
			listViewDisplayed={true}
			fetchDetails={true}
			renderDescription={(row) => row.description}
			styles={{
				container: styles.screen,
				textInputContainer: {
					backgroundColor: 'rgba(0,0,0,0)',
					borderTopWidth: 0,
					borderBottomWidth: 0,
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				},
				textInput: {
					marginLeft: 0,
					marginRight: 0,
					height: 38,
					color: '#5d5d5d',
					fontSize: 16,
				},
				predefinedPlacesDescription: {
					color: '#1faadb',
				},
			}}
			onPress={(data, details = null) => {
				// 'details' is provided when fetchDetails = true
				console.log(data, details);
			}}
			query={{
				key: '',
				language: 'en',
			}}
		/>
	);
};

export default AddressSearch;
