import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
	createDrawerNavigator,
	DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import StartUpScreen from '../screens/StartUpScreen';
import Auth from '../screens/Auth';

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
	Auth: Auth,
});

export default createAppContainer(MainNavigator);
