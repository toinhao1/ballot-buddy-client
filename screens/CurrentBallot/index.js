import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RepCard from '../../components/RepCard';
import RepDataCard from '../../components/RepDataCard';

import { getCurrentBallot } from '../../store/actions/ballot';
import { styles } from './Styles';
import Colors from '../../constants/Colors';

const CurrentBallot = (props) => {
	const ballot = useSelector((state) => state.ballot.currentBallot);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const getBallot = async () => {
			setIsLoading(true);
			try {
				await dispatch(getCurrentBallot());
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		if (Object.keys(ballot).length == 0) {
			getBallot();
		}
	}, [dispatch]);

	const selectRepHandler = (repData) => {
		props.navigation.navigate('SelectedRep', {
			data: {
				repData,
				isForBallot: true,
			},
		});
	};

	if (isLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}
	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View>
				{
					ballot &&
						ballot.races &&
						Object.keys(ballot.races).map((key) => {
							return (
								<View key={key}>
									<View style={styles.sectionContainer}>
										<Text style={styles.sectionTitles}>{key}</Text>
									</View>
									{ballot.races[key].map((candidate) => {
										return (
											<View key={candidate.candidate_id}>
												<RepCard
													incumbent={candidate.incumbent}
													photo={candidate.photo}
													office={candidate.office}
													name={candidate.name}
													party={candidate.party}
													onSelect={() => {
														selectRepHandler(candidate);
													}}
												>
													<Text>
														{candidate.office_id === 496 || candidate.office_id === 79
															? 'Race: ' + candidate.district
															: ''}
													</Text>
												</RepCard>
											</View>
										);
									})}
								</View>
							);
						})
					// need to add ballot measures here
				}
				{ballot && ballot.ballotMeasures && (
					<View>
						<View style={styles.sectionContainer}>
							<Text style={styles.sectionTitles}>Ballot Measures</Text>
						</View>
						{ballot.ballotMeasures.map((measure) => {
							return (
								<View key={measure.measureId}>
									<RepDataCard
										onSelect={() => {
											selectRepHandler(candidate);
										}}
									>
										<View>
											<Text>{measure.title}</Text>
										</View>
									</RepDataCard>
								</View>
							);
						})}
					</View>
				)}
			</View>
		</ScrollView>
	);
};

CurrentBallot.navigationOptions = () => {
	return {
		headerTitle: 'Current Ballot',
	};
};

export default CurrentBallot;
