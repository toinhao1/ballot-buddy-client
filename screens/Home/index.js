import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import { styles } from './Styles';

const Home = () => {
	return (
		<View style={styles.screen}>
			<Text>This is a users main page. </Text>
		</View>
	);
};

Home.navigationOptions = (navData) => {
	return {
		headerTitle: 'DashBoard',
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

export default Home;
