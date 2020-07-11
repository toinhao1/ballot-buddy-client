import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';

import Card from '../Card';
import { styles } from './Styles';

const TouchableCard = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}
	return (
		<Card style={props.mainCard}>
			<View style={styles.touchable}>
				<TouchableCmp onPress={props.onSelect} useForeground={true}>
					<View style={props.contentContainer}>{props.children}</View>
				</TouchableCmp>
			</View>
		</Card>
	);
};

export default TouchableCard;
