import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	loadingScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
	},
	collapsible: {
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		width: '90%',
		marginVertical: 15,
	},
});
