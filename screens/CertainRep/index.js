import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedRepContactInfo } from '../../store/actions/representatives';
import { styles } from './Styles';
import RepCard from '../../components/RepCard';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';

const CertainRep = (props) => {
	const [isLoading, setIsLoading] = useState();
	const currentRepContactInfo = useSelector(
		(state) => state.representatives.selectedRepInfo
	);
	const repData = props.navigation.getParam('repData');

	const dispatch = useDispatch();

	useEffect(() => {
		const callRepData = async (candidateId) => {
			setIsLoading(true);
			try {
				await dispatch(getSelectedRepContactInfo(candidateId));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		callRepData(repData.candidate_id);
	}, [dispatch]);

	if (isLoading || !currentRepContactInfo.address) {
		return (
			<View style={styles.loadingScreen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={styles.screen}>
				<RepCard
					photo={repData.photo}
					office={repData.office}
					name={repData.name}
					party={repData.party}
				/>
				<Card style={styles.socialCard}>
					<View style={styles.iconRow}>
						{currentRepContactInfo.webAddresses['Website - Facebook'] && (
							<AntDesign.Button
								backgroundColor="white"
								name="facebook-square"
								size={24}
								color="black"
								onPress={() =>
									WebBrowser.openBrowserAsync(
										currentRepContactInfo.webAddresses['Website - Facebook']
									)
								}
							/>
						)}
						{currentRepContactInfo.webAddresses['Website - Twitter'] && (
							<AntDesign.Button
								backgroundColor="white"
								name="twitter"
								size={24}
								color="black"
								onPress={() =>
									WebBrowser.openBrowserAsync(
										currentRepContactInfo.webAddresses['Website - Twitter']
									)
								}
							/>
						)}
						{currentRepContactInfo.webAddresses['Website'] && (
							<MaterialCommunityIcons.Button
								backgroundColor="white"
								name="web"
								size={24}
								color="black"
								onPress={() =>
									WebBrowser.openBrowserAsync(
										currentRepContactInfo.webAddresses['Website']
									)
								}
							/>
						)}
						{currentRepContactInfo.webAddresses['Email'] && (
							<MaterialCommunityIcons.Button
								backgroundColor="white"
								name="email"
								size={24}
								color="black"
								onPress={() =>
									WebBrowser.openBrowserAsync(
										`mailto:${currentRepContactInfo.webAddresses['Email']}`
									)
								}
							/>
						)}
					</View>
					<View>
						<Text>Phone: {currentRepContactInfo.phoneNumber}</Text>
						<Text>Address: </Text>
						<Text>{currentRepContactInfo?.address.street}</Text>
						<Text>
							{currentRepContactInfo?.address.city},{' '}
							{currentRepContactInfo?.address.state + ''}
							{currentRepContactInfo?.address.zip}{' '}
						</Text>
					</View>
				</Card>
				<Text style={styles.title}>Recent News:</Text>
				<Text>{repData.name}</Text>
				<Text style={styles.title}>Political Experience:</Text>
			</View>
		</ScrollView>
	);
};

export default CertainRep;
