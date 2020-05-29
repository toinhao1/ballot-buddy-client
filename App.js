import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, AppLoading } from 'expo';
import * as Font from 'expo-font';

SplashScreen.preventAutoHide();
setTimeout(SplashScreen.hide, 2500);

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

const App = () => {
	const [isLoaded, setIsLoaded] = useState(false);

	if (!isLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => {
					setIsLoaded(true);
				}}
			/>
		);
	}
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
