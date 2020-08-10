import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { getMeasureDetails } from '../../store/actions/ballot';
import { styles } from './Styles';
import Colors from '../../constants/Colors';
import RepDataCard from '../../components/RepDataCard';

const CertainMeasure = (props) => {
	const { measureId } = props.navigation.getParam('measureData');
	const { specificMeasure } = useSelector((state) => state.ballot.ballotMeasure);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const getBallotMeasure = async () => {
			setIsLoading(true);
			try {
				await dispatch(getMeasureDetails(measureId));
				setIsLoading(false);
			} catch (err) {}
		};
		getBallotMeasure();
	}, [dispatch]);

	if (isLoading) {
		return (
			<View style={styles.loadingScreen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<ScrollView>
			<View style={styles.screen}>
				{specificMeasure?.title && (
					<View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitles}>Measure Title:</Text>
						</View>
						<RepDataCard>
							<View>
								<Text>{specificMeasure.title}</Text>
							</View>
						</RepDataCard>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitles}>Election Date:</Text>
						</View>
						<RepDataCard>
							<View>
								<Text>{specificMeasure.electionDate}</Text>
							</View>
						</RepDataCard>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitles}>Measure Summary:</Text>
						</View>
						<RepDataCard>
							<View>
								<Text>{specificMeasure.summary.replace(/(<([^>]+)>)/gi, '')}</Text>
							</View>
						</RepDataCard>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitles}>Link To Summary:</Text>
						</View>
						<RepDataCard
							onSelect={() => WebBrowser.openBrowserAsync(`${specificMeasure.summaryUrl}`)}
						>
							<View>
								<Text>{specificMeasure.summaryUrl}</Text>
							</View>
						</RepDataCard>
					</View>
				)}
			</View>
		</ScrollView>
	);
};

CertainMeasure.navigationOptions = () => {
	return {
		headerTitle: 'Selected Measure Details',
	};
};

export default CertainMeasure;
