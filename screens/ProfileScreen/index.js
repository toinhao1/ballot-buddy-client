import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/HeaderButton';
import Card from '../../components/Card';

import { getProfile } from '../../store/actions/profile';
import { styles } from './Styles';

const ProfileScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const user = useSelector((state) => state.profile.user);
	const dispatch = useDispatch();

	useEffect(() => {
		const getUserData = async () => {
			try {
				await dispatch(getProfile());
				setIsLoading(false);
			} catch (err) {
				console.log('Profile Screen Error', err);
			}
		};
		getUserData();
	}, []);

	if (isLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Card style={styles.emailCard}>
				<Text>Email: {user.email}</Text>
			</Card>
			<Card style={styles.addressCard}>
				<Text>Street: {user.address.street}</Text>
				<Text>City: {user.address.city}</Text>
				<Text>State: {user.address.state}</Text>
				<Text>Zip Code: {user.address.zipcode}</Text>
			</Card>
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
