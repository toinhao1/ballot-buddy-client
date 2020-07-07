import React, { useState, useEffect } from 'react';
import {
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { getSelectedRepContactInfo } from '../../store/actions/representatives';
import { styles } from './Styles';
import RepCard from '../../components/RepCard';
import Colors from '../../constants/Colors';
import ContactInfoCard from '../../components/ContactInfoCard';
import RepDataCard from '../../components/RepDataCard';

const CertainRep = (props) => {
	const [isLoading, setIsLoading] = useState();
	const currentRepContactInfo = useSelector(
		(state) => state.representatives.selectedRepInfo
	);
	const { repData, isForBallot } = props.navigation.getParam('data');

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
		callRepData(repData, isForBallot);
	}, [dispatch]);

	if (isLoading || !currentRepContactInfo.newsArticles) {
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
					<ContactInfoCard currentRepContactInfo={currentRepContactInfo} />
					<Text style={styles.title}>Recent News:</Text>
					{currentRepContactInfo.newsArticles.length > 0 ? (
						currentRepContactInfo.newsArticles.map((article, index) => {
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

					<Text style={styles.title}>Political Experience:</Text>
					{Array.isArray(currentRepContactInfo.politicalExperience) ? (
						currentRepContactInfo.politicalExperience.map(
							(experience, index) => {
								return (
									<RepDataCard key={repData.candidate_id + index}>
										<View>
											<Text>{experience?.title || ''}</Text>
											<Text>{experience?.organization || ''}</Text>
											<Text>{experience?.span || ''}</Text>
										</View>
									</RepDataCard>
								);
							}
						)
					) : (
						<Text>Not Available</Text>
					)}
					<Text style={styles.title}>Professional Experience:</Text>
					{Array.isArray(currentRepContactInfo.professionalExperience) ? (
						currentRepContactInfo.professionalExperience.map(
							(experience, index) => {
								return (
									<RepDataCard key={repData.candidate_id + index}>
										<View>
											<Text>{experience?.title || ''}</Text>
											<Text>{experience?.organization || ''}</Text>
											<Text>{experience?.span || ''}</Text>
										</View>
									</RepDataCard>
								);
							}
						)
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
