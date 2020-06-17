import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
	createDrawerNavigator,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';
import StartUpScreen from '../screens/StartUpScreen';
import AuthScreen from '../screens/Auth';
import AddressSearch from '../screens/AddressSearch';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import EditEmail from '../screens/EditEmail';
import EditAddress from '../screens/EditAddress';
import CurrentReps from '../screens/CurrentReps';
import CurrentBallot from '../screens/CurrentBallot';

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const UserAccessNavigator = createStackNavigator(
	{
		MainLanding: Home,
		CurrentRepresentatives: CurrentReps,
		CurrentBallot: CurrentBallot,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AdminNavigator = createStackNavigator(
	{
		Profile: ProfileScreen,
		EmailForm: EditEmail,
		AddressForm: EditAddress,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const BuddyNavigator = createDrawerNavigator(
	{
		Dashboard: UserAccessNavigator,
		Profile: AdminNavigator,
	},
	{
		contentOptions: {
			activeTint: Colors.primary,
		},
		contentComponent: (props) => {
			const dispatch = useDispatch();
			return (
				<View style={{ flex: 1, paddingTop: 25 }}>
					<SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
						<DrawerNavigatorItems {...props} />
						<Button
							title="Logout"
							color={Colors.primary}
							onPress={() => {
								dispatch(authActions.logout());
								props.navigation.navigate('Auth');
							}}
						/>
					</SafeAreaView>
				</View>
			);
		},
	}
);

const AuthNavigator = createStackNavigator(
	{
		Auth: AuthScreen,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AddressNavigator = createStackNavigator(
	{
		Address: AddressSearch,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const MainNavigator = createSwitchNavigator({
	Start: StartUpScreen,
	Auth: AuthNavigator,
	Address: AddressNavigator,
	Buddy: BuddyNavigator,
});

export default createAppContainer(MainNavigator);
