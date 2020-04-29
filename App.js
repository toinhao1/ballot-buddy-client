import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen } from 'expo';

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 2500);

const App = () => {
	return (
		<View style={styles.container}>
			<Text>Landing page for BallotBuddy</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
