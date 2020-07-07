import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import RepCard from '../../components/RepCard';
import { getCurrentRepresentatives } from '../../store/actions/representatives';
import { styles } from './Styles';
import Colors from '../../constants/Colors';

const CurrentReps = (props) => {
	const reps = useSelector((state) => state.representatives.reps);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		const callReps = async () => {
			setIsLoading(true);
			try {
				await dispatch(getCurrentRepresentatives());
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		};
		if (reps.length == 0) {
			callReps();
		}
	}, [dispatch]);

	const selectRepHandler = (repData) => {
		props.navigation.navigate('SelectedRep', {
			data: {
				repData,
				isForBallot: false,
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
		<FlatList
			data={reps}
			keyExtractor={(item) => item.candidate_id.toString()}
			renderItem={(itemData) => (
				<RepCard
					photo={itemData.item.photo}
					office={itemData.item.office}
					name={itemData.item.name}
					party={itemData.item.party}
					onSelect={() => {
						selectRepHandler(itemData.item);
					}}
				/>
			)}
		/>
	);
};

CurrentReps.navigationOptions = () => {
	return {
		headerTitle: 'Current Reps',
	};
};

export default CurrentReps;
