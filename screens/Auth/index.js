import React, { useEffect, useCallback, useReducer, useState } from 'react';
import {
	View,
	KeyboardAvoidingView,
	ScrollView,
	Button,
	Alert,
	ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';

import * as authActions from '../../store/actions/auth';
import { styles } from './Styles';
import { formReducer, FORM_INPUT_UPDATE } from './formReducer';

// TODO: implement Sign in with Google button
const AuthScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const [isSignup, setIsSignup] = useState(false);

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
			password: '',
		},
		inputValidities: {
			email: false,
			password: false,
		},
		formIsValid: false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
		}
	}, [error]);

	const authHandler = async () => {
		let action;
		if (formState.formIsValid) {
			if (isSignup) {
				action = authActions.signUp(
					formState.inputValues.email,
					formState.inputValues.password
				);
			} else {
				action = authActions.login(
					formState.inputValues.email,
					formState.inputValues.password
				);
			}
			setError(null);
			setIsLoading(true);
			try {
				await dispatch(action);
				props.navigation.navigate('Address');
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		} else {
			return Alert.alert(
				'Please correct your errors',
				'There are errors in the form',
				[{ type: 'Okay' }]
			);
		}
	};

	const inputChangeHandler = useCallback(
		(inputIdentifier, inputValue, inputValidity) => {
			dispatchFormState({
				type: FORM_INPUT_UPDATE,
				value: inputValue,
				isValid: inputValidity,
				input: inputIdentifier,
			});
		},
		[dispatchFormState]
	);

	return (
		<KeyboardAvoidingView style={styles.screen}>
			{/* <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}> */}
			<Card style={styles.authContainer}>
				<ScrollView>
					<Input
						id="email"
						label="E-Mail"
						keyboardType="email-address"
						required
						email
						autoCapitalize="none"
						errorText="Please enter a valid email address."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<Input
						id="password"
						label="Password"
						keyboardType="default"
						secureTextEntry
						required
						minLength={5}
						autoCapitalize="none"
						errorText="Please enter a valid password."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator size="small" color={Colors.primary} />
						) : (
							<Button
								title={isSignup ? 'Sign Up' : 'Login'}
								color={Colors.primary}
								onPress={authHandler}
							/>
						)}
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
							color={Colors.accent}
							onPress={() => {
								setIsSignup((prevState) => !prevState);
							}}
						/>
					</View>
				</ScrollView>
			</Card>
			{/* </LinearGradient> */}
		</KeyboardAvoidingView>
	);
};

AuthScreen.navigationOptions = {
	headerTitle: 'Please Sign In or Sign Up',
};

export default AuthScreen;
