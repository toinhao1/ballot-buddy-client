import React, { useState } from 'react';
import { SplashScreen, AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import store from './store/configureStore';

import NavigationContainer from './navigation/NavigationContainer';

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
		<Provider store={store}>
			<NavigationContainer />
		</Provider>
	);
};

export default App;
