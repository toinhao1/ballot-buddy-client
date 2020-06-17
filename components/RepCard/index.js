import React from 'react';
import { Text, View, Image } from 'react-native';

import Card from '../Card';

const RepCard = (props) => {
	return (
		<Card>
			<View>
				<Image source={props.photo} />
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
