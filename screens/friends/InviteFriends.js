import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	TextInput,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import { StackActions } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import server from "../../api/server";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { Icon } from "@rneui/themed";

const InviteFriends = ({ gameId, closeModal }) => {
	const [friendsList, setFriendsList] = useState(null);
	const [lastPong, setLastPong] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [myId, setMyId] = useState(null);
	const [friendEmail, setFriendEmail] = useState(null);

	const getFriends = async () => {
		try {
			const myId = await SecureStore.getItemAsync("id");
			setMyId(myId);
			const { data } = await server.get(`/users/${myId}`);
			setFriendsList(data.user.friends);
			setLastPong(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getFriends();
	}, []);

	const inviteFriend = async (friendId) => {
		try {
			await server.post("/users/invite", {
				gameId,
				userId: myId,
				friendId,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const renderPlayesList = () => {
		return friendsList.map((player) => {
			return (
				<View key={player._id} style={styles.JoinedCon}>
					<TouchableOpacity onPress={() => inviteFriend(player._id)}>
						<Icon
							reverse
							name="add-circle"
							color="green"
							// Component={UserOutlined}
							type="lonicons"
							size={20}
						/>
					</TouchableOpacity>
					<JoinedPlayer name={player.name} />
				</View>
			);
		});
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Text style={styles.text}>الأصدقاء</Text>
					<View style={styles.listCon}>
						{friendsList && renderPlayesList()}
					</View>
					<View>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => closeModal(false)}
						>
							<Text style={styles.loginText}>خروج</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
		flex: 1,
		direction: "rtl",
	},
	JoinedCon: {
		borderBottomColor: "#a0a0a0",
		borderBottomWidth: 1,
		padding: 20,
		marginBottom: 40,
		width: "80%",
		flexDirection: "row",
		// flex: 2,
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 50,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
	},
	listCon: {
		flex: 1,
		alignItems: "flex-end",
		// justifyContent: "flex-end",
		width: "90%",
	},
	loginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f30a0",
		bottom: 20,
	},
	disabledloginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#6b6b6b",
		bottom: 20,
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	pic: {
		width: 50,
		height: 50,
		backgroundColor: "#5c5b5b",
		borderRadius: 50,
		marginLeft: 10,
	},
	box: {
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
		alignItems: "center",
	},
});

export default InviteFriends;
