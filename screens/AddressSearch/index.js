import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { styles } from './Styles';

const AddressSearch = () => {
	const [inputValue, setInputValue] = useState('');
	return (
		<View style={styles.screen}>
			<Text>Address search input</Text>
			<TextInput
				style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				onChangeText={(text) => setInputValue(text)}
				value={inputValue}
			/>
		</View>
	);
};

export default AddressSearch;
