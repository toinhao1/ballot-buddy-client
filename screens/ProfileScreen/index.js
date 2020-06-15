import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import HeaderButton from '../../components/HeaderButton';
import Card from '../../components/Card';

import { getProfile } from '../../store/actions/profile';
import { styles } from './Styles';

const ProfileScreen = (props) => {
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
	}, [dispatch]);

	const editEmail = () => {
		props.navigation.navigate('EmailForm');
	};

	const editAddress = () => {
		props.navigation.navigate('AddressForm');
	};

	if (isLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Card style={styles.card}>
				<View style={styles.innerContainer}>
					<View style={styles.item}>
						<Text>Email: {user.email}</Text>
					</View>
					<View>
						<FontAwesome.Button
							backgroundColor="white"
							name="edit"
							size={24}
							color="black"
							onPress={editEmail}
						></FontAwesome.Button>
					</View>
				</View>
			</Card>
			<Card style={styles.card}>
				<View style={styles.innerContainer}>
					<View style={styles.item}>
						<Text>Street: {user.address.street}</Text>
						<Text>City: {user.address.city}</Text>
						<Text>State: {user.address.state}</Text>
						<Text>Zip Code: {user.address.zipcode}</Text>
					</View>
					<View>
						<FontAwesome.Button
							backgroundColor="white"
							name="edit"
							size={24}
							color="black"
							onPress={editAddress}
						></FontAwesome.Button>
					</View>
				</View>
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
