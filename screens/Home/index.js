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
				mainCard={styles.mainCard}
				onSelect={() => props.navigation.navigate('CurrentRepresentatives')}
			>
				<View>
					<Text>Current Reps</Text>
				</View>
			</TouchableCard>
			<Text>This is a users main page. </Text>
			<TouchableCard
				mainCard={styles.mainCard}
				onSelect={() => props.navigation.navigate('CurrentBallot')}
			>
				<View>
					<Text>Current Ballot</Text>
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
