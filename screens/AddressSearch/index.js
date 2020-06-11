import React, { useState } from 'react';
import { ActivityIndicator, View, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

import { styles } from './Styles';
import Colors from '../../constants/Colors';

const AddressSearch = (props) => {
	const hasAddress = useSelector((state) => !!state.auth.userAddress);
	const [inputValue, setInputValue] = useState('');
	console.log(hasAddress);
	if (hasAddress) {
		props.navigation.navigate('Buddy');
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<View style={styles.screen}>
			<Text>Address search input</Text>
			<TextInput
				style={{
					width: '90%',
					height: 40,
					borderColor: 'gray',
					borderWidth: 1,
				}}
				onChangeText={(text) => setInputValue(text)}
				value={inputValue}
			/>
		</View>
	);
};

export default AddressSearch;
