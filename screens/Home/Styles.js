import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainCard: {
		width: '90%',
		height: '40%',
		maxHeight: 400,
		margin: 20,
		backgroundColor: '#5f9ea0',
	},
	contentContainer: {
		width: '100%',
		height: '100%',
		padding: 25,
	},
	textStyle: {
		fontSize: 40,
		fontFamily: 'open-sans-bold',
		color: 'white',
	},
});
