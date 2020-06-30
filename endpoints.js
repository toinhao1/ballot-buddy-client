import { Platform } from 'react-native';

const localhost =
	Platform.OS === 'ios'
		? 'http://localhost:5000/'
		: 'http://192.168.1.10:5000/';

const ENV = {
	dev: {
		apiUrl: localhost,
	},
	staging: {
		apiUrl: '[your.staging.api.here]',
		// Add other keys you want here
	},
	prod: {
		apiUrl: '[your.production.api.here]',
		// Add other keys you want here
	},
};

const getEnvVars = () => {
	if (process.env.NODE_ENV === 'development') {
		return ENV.dev;
	} else if (process.env.NODE_ENV === 'production') {
		return ENV.prod;
	}
};

const selectedENV = getEnvVars();

export default selectedENV;
