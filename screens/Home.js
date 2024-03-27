import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { StackActions } from "@react-navigation/native";
import useStore from "../store/store";
import { useEffect, useState } from "react";
import server from "../api/server";
import * as SecureStore from "expo-secure-store";
import InvitedUser from "./friends/InvitedUser";
import { useInterval } from "../common";

const Home = ({ route, navigation }) => {
	const [myId, setMyId] = useState(null);
	const [invited, setInvited] = useState(null);
	const [invite, setInvite] = useState(null);

	const isUser = useStore((state) => state.isUser);

	const getUser = async () => {
		try {
			const myId = await SecureStore.getItemAsync("id");
			setMyId(myId);
			const { data } = await server.get(`/users/${myId}`);
			if (data.user.invited.gameId) setInvite(data.user.invited);
			if (data.user.invited.gameId) {
				setInvited(true);
			} else {
				setInvited(false);
			}
		} catch (err) {
			console.log(err);
		}
	};
	if (isUser) {
		useInterval(() => getUser(), 2000);
	}

	return (
		<View style={styles.container}>
			{invited && (
				<View style={styles.invite}>
					<InvitedUser
						invite={invite}
						invited={invited}
						userId={myId}
						nav={navigation}
					/>
				</View>
			)}
			<View style={styles.box}>
				<View style={styles.btn}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={() => navigation.navigate("host")}
					>
						<Text style={styles.loginText}>استضف لعبة</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.btn}>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={() =>
							navigation.navigate("lobby", {
								lastPong: false,
								gameId: null,
							})
						}
					>
						<Text style={styles.loginText}>الانضمام للعبة</Text>
					</TouchableOpacity>
				</View>
				{isUser && (
					<View style={styles.btn}>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => navigation.navigate("friends")}
						>
							<Text style={styles.loginText}>الأصدقاء</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		margin: 10,
	},
	loginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f30a0",
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	box: {
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
	},
	invite: {
		height: "20%",
		marginBottom: 20,
	},
});

export default Home;
