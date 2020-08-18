import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

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
		backgroundColor: Colors.accent,
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
