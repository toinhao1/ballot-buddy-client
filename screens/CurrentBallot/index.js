import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, ScrollView, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RepCard from '../../components/RepCard';
import { getCurrentBallot } from '../../store/actions/ballot';
import { styles } from './Styles';
import Colors from '../../constants/Colors';

const CurrentBallot = (props) => {
	const ballot = useSelector((state) => state.ballot.currentBallot);
	const [isLoading, setIsLoading] = useState(true);
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
		getBallot();
	}, [dispatch]);

	const selectRepHandler = (repData) => {
		props.navigation.navigate('SelectedRep', {
			repData,
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
		<ScrollView>
			<View style={styles.screen}>
				{ballot &&
					Object.keys(ballot).map((key) => {
						return (
							<View key={key}>
								<Text>{key}</Text>
								{ballot[key].map((candidate) => {
									return (
										<RepCard
											photo={candidate.photo}
											office={candidate.office}
											name={candidate.name}
											party={candidate.party}
											// onSelect={() => {
											// 	selectRepHandler(itemData.item);
											// }}
										/>
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
