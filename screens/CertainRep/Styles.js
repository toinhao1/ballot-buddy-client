import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		padding: 10,
	},
	iconRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 30,
		paddingHorizontal: 20,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginVertical: 2,
	},
});
