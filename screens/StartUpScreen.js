import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as auth from '../store/actions/auth';

const StartUpScreen = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const checkForToken = async () => {
			// get user data from device storage
			const userData = await AsyncStorage.getItem('userData');
			//decode the token
			let decoded;
			if (userData) {
				decoded = decode(userData.token);
			}
			// get the time to then check if the token is expired
			const currentTime = Date.now() / 1000;
			if (!userData || decoded.exp < currentTime) {
				props.navigation.navigate('Auth');
				dispatch(auth.logout());
				return;
			}
			props.navigation.navigate('Buddy');
		};
		checkForToken();
	}, []);

	return (
		<View style={styles.screen}>
			<ActivityIndicator size="large" color={Colors.primary} />
		</View>
	);
};

export default StartUpScreen;

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
