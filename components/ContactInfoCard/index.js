import React from 'react';
import { Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import Card from '../Card';
import { styles } from './Styles';

const ContactInfoCard = ({ currentRepContactInfo }) => {
	return (
		<Card style={styles.socialCard}>
			{Object.keys(currentRepContactInfo.webAddresses).length > 0 && (
				<View style={styles.iconRow}>
					{currentRepContactInfo.webAddresses['Website - Facebook'] && (
						<AntDesign.Button
							backgroundColor="white"
							name="facebook-square"
							size={24}
							color="black"
							onPress={() =>
								WebBrowser.openBrowserAsync(
									currentRepContactInfo.webAddresses['Website - Facebook']
								)
							}
						/>
					)}
					{currentRepContactInfo.webAddresses['Website - Twitter'] && (
						<AntDesign.Button
							backgroundColor="white"
							name="twitter"
							size={24}
							color="black"
							onPress={() =>
								WebBrowser.openBrowserAsync(
									currentRepContactInfo.webAddresses['Website - Twitter']
								)
							}
						/>
					)}
					{currentRepContactInfo.webAddresses['Website'] && (
						<MaterialCommunityIcons.Button
							backgroundColor="white"
							name="web"
							size={24}
							color="black"
							onPress={() =>
								WebBrowser.openBrowserAsync(
									currentRepContactInfo.webAddresses['Website']
								)
							}
						/>
					)}
					{currentRepContactInfo.webAddresses['Email'] && (
						<MaterialCommunityIcons.Button
							backgroundColor="white"
							name="email"
							size={24}
							color="black"
							onPress={() =>
								WebBrowser.openBrowserAsync(
									`mailto:${currentRepContactInfo.webAddresses['Email']}`
								)
							}
						/>
					)}
				</View>
			)}
			<View>
				<Text>
					Phone: {currentRepContactInfo.phoneNumber || 'Not Available'}
				</Text>

				<Text>
					Address: {!currentRepContactInfo.address && 'Not Available'}
				</Text>
				{currentRepContactInfo.address && (
					<View>
						<Text>{currentRepContactInfo?.address.street}</Text>
						<Text>
							{currentRepContactInfo.address.city + ' '}
							{currentRepContactInfo.address.state + ', '}
							{currentRepContactInfo.address.zip}{' '}
						</Text>
					</View>
				)}
			</View>
		</Card>
	);
};
export default ContactInfoCard;
