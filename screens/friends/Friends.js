import { useEffect, useState } from "react";
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

function Friends() {
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

	const addFriend = async () => {
		const json = { friendEmail: friendEmail.toLowerCase().trim() };
		try {
			setDisabled(true);
			const { data } = await server.post(`/users/${myId}/friends`, json);
			if (data) {
				setDisabled(false);
				getFriends();
			}
		} catch (error) {
			setDisabled(false);
			console.log(error);
		}
	};

	const deleteFriend = async (id) => {
		try {
			const { data } = await server.delete(
				`/users/${myId}/friends/${id}`
			);
			if (data) alert("تم الحذف");
			const newList = friendsList.filter((friend) => friend._id != id);
			setFriendsList(newList);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getFriends();
	}, []);

	const renderPlayesList = () => {
		return friendsList.map((player) => {
			return (
				<View key={player._id} style={styles.JoinedCon}>
					<TouchableOpacity onPress={() => deleteFriend(player._id)}>
						<Icon
							reverse
							name="delete"
							color="red"
							type="antdesign"
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
				<Spinner visible={lastPong} textContent={"Loading..."} />
				<View style={styles.box}>
					<Text style={styles.text}>الأصدقاء</Text>
					<View style={styles.boxContainer}>
						<View>
							<Text style={styles.addText}>إضافة صديق</Text>
						</View>
						<View style={styles.addContaier}>
							<View style={styles.inputView}>
								<TextInput
									style={styles.TextInput}
									placeholder="البريد الإلكتروني"
									placeholderTextColor="#1b1b1b"
									onChangeText={(email) =>
										setFriendEmail(email)
									}
								/>
							</View>
							<TouchableOpacity
								style={
									disabled
										? styles.disabledloginBtn
										: styles.loginBtn
								}
								disabled={disabled}
								onPress={addFriend}
							>
								<Text style={styles.loginText}>إضافة</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.listCon}>
						{friendsList && renderPlayesList()}
					</View>
					<View>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => habdleNavigate()}
						>
							<Text style={styles.loginText}>خروج</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

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
	inputView: {
		display: "flex",
		backgroundColor: "#e0e0e0",
		borderRadius: 10,
		width: 250,
		height: 45,
		marginBottom: 20,
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "a-massir-ballpoint",
	},

	TextInput: {
		height: 50,
		// flex: 1,
		// width: 210,
		width: "100%",
		textAlign: "center",

		// marginLeft: 20,
		justifyContent: "center",
		alignItems: "center",
		color: "#1b1b1b",
		// fontFamily: "a-massir-ballpoint",
	},
	boxContainer: {
		backgroundColor: "#f51f1f94",
		borderRadius: 20,
		padding: 20,
		marginTop: 15,
		// alignItems: "center"
	},
	addText: {
		fontSize: 20,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
	},
	addContaier: {
		alignItems: "center",
	},
});

export default Friends;
