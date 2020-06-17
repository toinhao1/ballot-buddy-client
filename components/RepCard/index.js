import React from 'react';
import { Text, View, Image } from 'react-native';

import Card from '../Card';
import { styles } from './Styles';

const RepCard = (props) => {
	return (
		<Card style={styles.card}>
			<View>
				<Image
					style={{ width: 50, height: 50 }}
					source={{ uri: props.photo }}
				/>
			</View>
			<View>
				<Text>{props.office}</Text>
				<Text>{props.name}</Text>
				<Text>{props.party}</Text>
			</View>
		</Card>
	);
};

export default RepCard;
