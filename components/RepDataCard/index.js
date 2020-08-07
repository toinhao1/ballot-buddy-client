import React from 'react';
import TouchableCard from '../TouchableCard';

import { styles } from './Styles';

const RepDataCard = (props) => {
	return (
		<TouchableCard
			mainCard={styles.mainCard}
			contentContainer={styles.contentContainer}
			onSelect={props.onSelect}
		>
			{props.children}
		</TouchableCard>
	);
};

export default RepDataCard;
