import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, ActivityIndicator } from 'react-native';

import { styles } from './Styles';
import Colors from '../../constants/Colors';
import RepDataCard from '../../components/RepDataCard';

const CertainMeasure = (props) => {
	const { measureId } = props.navigation.getParam('measureData');
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	const getBallotMeasure = async () => {
	// 		setIsLoading(true);
	// 		try {
	// 			await dispatch(getMeasureDetails(measureId));
	// 			setIsLoading(false);
	// 		} catch (err) {}
	// 	};
	// 	getBallotMeasure();
	// }, [dispatch]);

	if (isLoading) {
		return (
			<View style={styles.loadingScreen}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text>Certain Measure</Text>
		</View>
	);
};

export default CertainMeasure;
