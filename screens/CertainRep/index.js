import React from 'react';
import { Text, View, Button } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from './Styles';
import RepCard from '../../components/RepCard';

const CertainRep = (props) => {
	const repData = props.navigation.getParam('repData');
	return (
		<View style={styles.screen}>
			<RepCard
				photo={repData.photo}
				office={repData.office}
				name={repData.name}
				party={repData.party}
			/>
			<View style={styles.iconRow}>
				<AntDesign.Button
					backgroundColor="white"
					name="facebook-square"
					size={24}
					color="black"
					onPress={() => console.log('pressed')}
				/>
				<AntDesign.Button
					backgroundColor="white"
					name="twitter"
					size={24}
					color="black"
					onPress={() => console.log('pressed')}
				/>
				<MaterialCommunityIcons.Button
					backgroundColor="white"
					name="web"
					size={24}
					color="black"
					onPress={() => console.log('pressed')}
				/>
			</View>
			<Text style={styles.title}>Recent News:</Text>
			<Text>{repData.name}</Text>
			<Text style={styles.title}>Education:</Text>
			<Text style={styles.title}>Political Experience:</Text>
		</View>
	);
};

export default CertainRep;
