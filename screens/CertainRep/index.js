import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
	Button,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';

import { getSelectedRepContactInfo } from '../../store/actions/representatives';
import { styles } from './Styles';
import RepCard from '../../components/RepCard';
import Colors from '../../constants/Colors';
import ContactInfoCard from '../../components/ContactInfoCard';
import RepDataCard from '../../components/RepDataCard';

const CertainRep = (props) => {
	const { repData, isForBallot } = props.navigation.getParam('data');
	const [newsCollapsed, setNewsCollapsed] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const currentRepContactInfo = useSelector(
		(state) => state.representatives.selectedRepInfo
	);
	let specificRep = currentRepContactInfo[repData.name];
	const dispatch = useDispatch();

	useEffect(() => {
		const callRepData = async (repData, isForBallot) => {
			setIsLoading(true);
			try {
				await dispatch(getSelectedRepContactInfo(repData, isForBallot));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		if (repData.candidate_id !== specificRep?.candidateId) {
			callRepData(repData, isForBallot);
		}
	}, [dispatch]);

	if (isLoading || !specificRep?.newsArticles) {
		return (
			<View style={styles.loadingScreen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<SafeAreaView>
			<ScrollView>
				<View style={styles.screen}>
					<RepCard
						photo={repData.photo}
						office={repData.office}
						name={repData.name}
						party={repData.party}
					/>
					<ContactInfoCard currentRepContactInfo={specificRep} />
					<View style={styles.collapsible}>
						<Text style={styles.title}>Recent News:</Text>
						<AntDesign
							name={newsCollapsed ? 'down' : 'up'}
							size={24}
							color="black"
							onPress={() => setNewsCollapsed(!newsCollapsed)}
						/>
					</View>
					<Collapsible
						duration={1000}
						enablePointerEvents
						collapsed={newsCollapsed}
					>
						{specificRep.newsArticles.length > 0 ? (
							specificRep.newsArticles.map((article, index) => {
								return (
									<RepDataCard key={article.description + index}>
										<View>
											<Text
												onPress={() =>
													WebBrowser.openBrowserAsync(`${article.url}`)
												}
											>
												{article.title}
											</Text>
											<Text>Source: {article.source.name}</Text>
										</View>
									</RepDataCard>
								);
							})
						) : (
							<Text>Not Available</Text>
						)}
					</Collapsible>

					<Text style={styles.title}>Political Experience:</Text>
					{Array.isArray(specificRep.politicalExperience) ? (
						specificRep.politicalExperience.map((experience, index) => {
							return (
								<RepDataCard key={repData.candidate_id + index}>
									<View>
										<Text>{experience?.title || ''}</Text>
										<Text>{experience?.organization || ''}</Text>
										<Text>{experience?.span || ''}</Text>
									</View>
								</RepDataCard>
							);
						})
					) : (
						<Text>Not Available</Text>
					)}
					<Text style={styles.title}>Professional Experience:</Text>
					{Array.isArray(specificRep.professionalExperience) ? (
						specificRep.professionalExperience.map((experience, index) => {
							return (
								<RepDataCard key={repData.candidate_id + index}>
									<View>
										<Text>{experience?.title || ''}</Text>
										<Text>{experience?.organization || ''}</Text>
										<Text>{experience?.span || ''}</Text>
									</View>
								</RepDataCard>
							);
						})
					) : (
						<Text>Not Available</Text>
					)}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

CertainRep.navigationOptions = (navData) => {
	const { repData } = navData.navigation.getParam('data');
	return {
		headerTitle: repData.name,
	};
};

export default CertainRep;
