import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import TouchableCard from '../../components/TouchableCard';
import { styles } from './Styles';

const Home = (props) => {
	return (
		<View style={styles.screen}>
			<TouchableCard
				contentContainer={styles.contentContainer}
				mainCard={styles.mainCard}
				onSelect={() => props.navigation.navigate('CurrentRepresentatives')}
			>
				<View style={styles.textView}>
					<Text style={styles.textStyle}>View your Current Reps Now!</Text>
				</View>
			</TouchableCard>
			<TouchableCard
				contentContainer={styles.contentContainer}
				mainCard={styles.mainCard}
				onSelect={() => props.navigation.navigate('CurrentBallot')}
			>
				<View style={styles.text}>
					<Text style={styles.textStyle}>View your Current Ballot Now!</Text>
				</View>
			</TouchableCard>
		</View>
	);
};

Home.navigationOptions = (navData) => {
	return {
		headerTitle: 'Dashboard',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="Menu"
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

export default Home;
