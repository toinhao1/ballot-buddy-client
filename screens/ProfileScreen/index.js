import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import { styles } from './Styles';

const ProfileScreen = () => {
	return (
		<View style={styles.screen}>
			<Text>This is where you will see your profile!</Text>
		</View>
	);
};

ProfileScreen.navigationOptions = (navData) => {
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

export default ProfileScreen;
