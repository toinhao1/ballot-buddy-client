import React, { PureComponent } from 'react';
import { Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import TouchableCard from '../TouchableCard';
import Colors from '../../constants/Colors';
import { styles } from './Styles';

class RepCard extends PureComponent {
	render() {
		return (
			<TouchableCard
				onSelect={this.props.onSelect}
				contentContainer={styles.contentContainer}
				mainCard={styles.mainCard}
			>
				<LinearGradient
					// Background Linear Gradient
					colors={['rgba(190,190,190,1)', 'rgba(255,255,255,1)']}
					start={[1, 1]}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 0,
						height: 300,
					}}
				/>
				<View style={styles.imageContainer}>
					{!this.props.photo ? (
						<View>
							<Ionicons name="ios-person" size={150} color="black" />
						</View>
					) : (
						<Image style={styles.image} source={{ uri: this.props.photo }} />
					)}
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.repStatus}>
						{this.props.incumbent ? 'Incumbent' : this.props.incumbent === null ? 'Challenger' : ''}
					</Text>
					{this.props.children}
					{!this.props.ballot && (
						<Text style={styles.repOfficeText} ellipsizeMode="tail" numberOfLines={2}>
							{this.props.office}
						</Text>
					)}
					<Text style={styles.repNameText}>{this.props.name}</Text>
					<Text
						style={{
							...styles.repParty,
							color: this.props.party === 'Democratic' ? Colors.accent : Colors.primary,
						}}
					>
						{this.props.party}
					</Text>
				</View>
			</TouchableCard>
		);
	}
}

export default RepCard;
