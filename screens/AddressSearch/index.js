import React, { useState, useReducer, useEffect, useCallback } from 'react';
import {
	ActivityIndicator,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
	Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { styles } from './Styles';
import { setAddress } from '../../store/actions/profile';
import Colors from '../../constants/Colors';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { formReducer, FORM_INPUT_UPDATE } from './formReducer';

const AddressSearch = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const dispatch = useDispatch();

	const [formState, dispatchFormState] = useReducer(formReducer, {
		inputValues: {
			street: '',
			secondary: '',
			city: '',
			state: '',
			zipCode: '',
		},
		inputValidities: {
			street: false,
			secondary: true,
			city: false,
			state: false,
			zipCode: false,
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
				console.log(formState.inputValues);
				await dispatch(setAddress(formState.inputValues));
				props.navigation.navigate('Buddy');
			} catch (err) {
				setError(err.response.data.message);
				setIsLoading(false);
			}
		} else {
			return Alert.alert('Please correct your errors', 'There are errors in the form', [
				{ type: 'Okay' },
			]);
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
			<Card style={styles.formContainer}>
				<ScrollView>
					<Input
						id="street"
						label="Street"
						keyboardType="default"
						required
						autoCapitalize="words"
						errorText="Please enter a valid street, suach as 123 Abd Street"
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<Input
						id="secondary"
						label="Secondary"
						keyboardType="default"
						autoCapitalize="none"
						errorText="Please make a valid entry, such as APT #123"
						onInputChange={inputChangeHandler}
						initialValue=""
						initiallyValid={true}
					/>
					<Input
						id="city"
						label="City"
						keyboardType="default"
						required
						minLength={5}
						autoCapitalize={'words'}
						errorText="Please enter a valid city name."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<Input
						id="state"
						label="State"
						keyboardType="default"
						required
						minLength={2}
						maxLength={2}
						autoCapitalize={'characters'}
						errorText="Please enter a valid state."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<Input
						id="zipCode"
						label="Zip Code"
						keyboardType="number-pad"
						required
						minLength={5}
						maxLength={5}
						autoCapitalize="none"
						errorText="Please enter a valid city zip code."
						onInputChange={inputChangeHandler}
						initialValue=""
					/>
					<View style={styles.buttonContainer}>
						{isLoading ? (
							<ActivityIndicator size="small" color={Colors.primary} />
						) : (
							<Button title={'Submit'} color={Colors.primary} onPress={submissionHandler} />
						)}
					</View>
				</ScrollView>
			</Card>
		</KeyboardAvoidingView>
	);
};

AddressSearch.navigationOptions = {
	headerTitle: 'Enter your address to find your Ballot!',
};

export default AddressSearch;
