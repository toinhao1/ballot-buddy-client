import React from 'react';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../Card';
import { styles } from './Styles';

const RepCard = (props) => {
	let TouchableCmp = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		TouchableCmp = TouchableNativeFeedback;
	}

	return (
		<Card style={styles.mainCard}>
			<View style={styles.touchable}>
				<TouchableCmp onPress={props.onSelect} useForeground={true}>
					<View style={styles.contentContainer}>
						<View style={styles.imageContainer}>
							{!props.photo ? (
								<View>
									<Text>No Image Available</Text>
									<Ionicons name="ios-person" size={125} color="black" />
								</View>
							) : (
								<Image style={styles.image} source={{ uri: props.photo }} />
							)}
						</View>
						<View>
							<Text>{props.office}</Text>
							<Text>{props.name}</Text>
							<Text>{props.party}</Text>
						</View>
					</View>
				</TouchableCmp>
			</View>
		</Card>
	);
};

export default RepCard;
