import React, { useState } from 'react';
import { SplashScreen, AppLoading } from 'expo';
import * as Font from 'expo-font';

import MainNavigator from './navigation/MainNavigator';

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
	return <MainNavigator />;
};

export default App;
