import React from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';

import { styles } from './Styles';
import Card from '../Card';

const RepDataCard = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<Card style={styles.mainCard}>
			<View style={styles.touchable}>
				<TouchableCmp useForeground={true}>
					<View style={styles.contentContainer}>{props.children}</View>
				</TouchableCmp>
			</View>
		</Card>
	);
};

export default RepDataCard;
