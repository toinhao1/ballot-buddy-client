import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	card: {
		width: '80%',
		maxWidth: 400,
		maxHeight: 400,
		padding: 20,
		margin: 10,
	},
	innerContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
	},
	item: {
		width: '80%',
	},
});
