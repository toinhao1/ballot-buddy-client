import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	ActivityIndicator,
	AsyncStorage,
} from 'react-native';
import Colors from '../constants/Colors';

const StartUpScreen = (props) => {
	useEffect(() => {
		const checkForToken = async () => {
			const userData = await AsyncStorage.getItem('userData');

			if (!userData) {
				props.navigation.navigate('Auth');
				return;
			}
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
