import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	mainCard: {
		width: '90%',
		maxHeight: 400,
		margin: 20,
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
		marginBottom: 15,
		color: 'red',
	},
});
