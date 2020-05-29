import React from 'react';
import { StyleSheet, View, ActivityIndicator, Button } from 'react-native';
import Colors from '../constants/Colors';

const StartUpScreen = (props) => {
	const goToAuth = () => {
		props.navigation.navigate('Auth');
	};
	return (
		<View style={styles.screen}>
			{/* <ActivityIndicator size="large" color={Colors.primary} /> */}
			<Button onPress={goToAuth} />
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
