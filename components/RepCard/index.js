import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import TouchableCard from '../TouchableCard';
import { styles } from './Styles';

class RepCard extends PureComponent {
	render() {
		return (
			<TouchableCard
				onSelect={this.props.onSelect}
				contentContainer={styles.contentContainer}
				mainCard={styles.mainCard}
			>
				<View style={styles.imageContainer}>
					{!this.props.photo ? (
						<View>
							{/* <Text>No Image Available</Text> */}
							<Ionicons name="ios-person" size={150} color="black" />
						</View>
					) : (
						<Image style={styles.image} source={{ uri: this.props.photo }} />
					)}
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.repStatus}>
						{this.props.incumbent
							? 'Incumbent'
							: this.props.incumbent === null
							? 'Challenger'
							: ''}
					</Text>
					{this.props.children}
					<Text ellipsizeMode="tail" numberOfLines={2}>
						{this.props.office}
					</Text>
					<Text>{this.props.name}</Text>
					<Text>{this.props.party}</Text>
				</View>
			</TouchableCard>
		);
	}
}

export default RepCard;
