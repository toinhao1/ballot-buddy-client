import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
	createDrawerNavigator,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import * as authActions from '../store/actions/auth';

import Colors from '../constants/Colors';
import StartUpScreen from '../screens/StartUpScreen';
import AuthScreen from '../screens/Auth';
import AddressSearch from '../screens/AddressSearch';
import Home from '../screens/Home';

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
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const AdminNavigator = createStackNavigator(
	{
		AddressForm: AddressSearch,
	},
	{
		defaultNavigationOptions: defaultNavOptions,
	}
);

const BuddyNavigator = createDrawerNavigator(
	{
		UserAccess: UserAccessNavigator,
		Admin: AdminNavigator,
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
								console.log('log out');
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

const MainNavigator = createSwitchNavigator({
	Start: StartUpScreen,
	Auth: AuthNavigator,
	Buddy: BuddyNavigator,
});

export default createAppContainer(MainNavigator);
