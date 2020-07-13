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
	collapsibleTitle: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		width: '90%',
		marginVertical: 15,
	},
	collapsible: {
		paddingBottom: 30,
		width: '100%',
	},
});
