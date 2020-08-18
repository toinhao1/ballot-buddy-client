import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
	mainCard: {
		width: '90%',
		maxHeight: 400,
		marginHorizontal: 20,
		marginVertical: 10,
	},
	contentContainer: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center',
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 6,
	},
	imageContainer: {
		width: 125,
		height: 125,
		overflow: 'hidden',
		marginRight: 10,
	},
	textContainer: {
		width: '60%',
	},
	repStatus: {
		fontSize: 20,
		color: Colors.primary,
	},
	repOfficeText: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
	},
	repNameText: {
		fontSize: 18,
	},
	repParty: {
		fontSize: 16,
	},
});
