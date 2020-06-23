import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	socialCard: {
		width: '90%',
		height: 125,
	},
	loadingScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 30,
		paddingHorizontal: 10,
		marginTop: 10,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginVertical: 2,
	},
});
