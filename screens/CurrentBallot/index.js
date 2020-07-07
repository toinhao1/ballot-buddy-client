import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RepCard from '../../components/RepCard';
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
				{ballot &&
					Object.keys(ballot).map((key) => {
						return (
							<View key={key}>
								<View style={styles.sectionContainer}>
									<Text style={styles.sectionTitles}>{key}</Text>
								</View>
								{ballot[key].map((candidate) => {
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
											/>
										</View>
									);
								})}
							</View>
						);
					})}
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
