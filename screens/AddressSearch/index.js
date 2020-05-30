import React from 'react';
import { Text, View, TextInput } from 'react-native';

import { styles } from './Styles';

const AddressSearch = () => {
	return (
		<View style={styles.screen}>
			<Text>Search For your Address Here:</Text>
			<TextInput />
		</View>
	);
};

export default AddressSearch;
