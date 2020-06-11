import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import { styles } from './Styles';

const AddressSearch = () => {
	const [inputValue, setInputValue] = useState('');
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

AddressSearch.navigationOptions = (navData) => {
	return {
		headerTitle: 'Profile',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default AddressSearch;
