import React, { useState, useCallback, useEffect, useReducer } from 'react';
import {
	KeyboardAvoidingView,
	ScrollView,
	Button,
	Alert,
	ActivityIndicator,
	View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Colors from '../../constants/Colors';

import { styles } from './Styles';
import { formReducer, FORM_INPUT_UPDATE } from '../Auth/formReducer';

const EditEmail = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	const user = useSelector((state) => state.profile.user);

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			email: '',
		},
		inputValidities: {
			email: true,
		},
		formIsValid: false,
	});

	useEffect(() => {
		if (error) {
			Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
		}
	}, [error]);

	const submissionHandler = async () => {
		if (formState.formIsValid) {
			setError(null);
			setIsLoading(true);
			try {
				await dispatch(editUser(formState.inputValues));
				props.navigation.goBack();
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
			<Card style={styles.cardContainer}>
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
						initialValue={user.email}
					/>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator size="small" color={Colors.primary} />
						) : (
							<Button
								title={'Submit'}
								color={Colors.primary}
								onPress={submissionHandler}
							/>
						)}
					</View>
				</ScrollView>
			</Card>
		</KeyboardAvoidingView>
	);
};

EditEmail.navigationOptions = () => ({ headerTitle: 'Edit Email' });

export default EditEmail;
