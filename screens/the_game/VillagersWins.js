import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import { StackActions } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import useStore from "../../store/store";

const VillagersWins = ({ route, navigation }) => {
	const [whoWin, setWhoWin] = useState(route.params.win);
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [nav, setNav] = useState(true);
	const [home, setHome] = useState(null);

	const setRoomID = useStore((state) => state.setRoomId);
	const setJoinedPlayers1 = useStore((state) => state.setJoinedPlayers);

	const getOpen = async () => {
		const open = await SecureStore.getItemAsync("open");
		return open;
	};

	// useEffect(() => {
	// 	const open = getOpen();

	// 	// const resetAction = StackActions.reset({
	// 	// 	index: 1,
	// 	// 	actions: [
	// 	// 		NavigationAction.navigate({ routeName: "Profile" }),
	// 	// 		NavigationAction.navigate({ routeName: "Settings" }),
	// 	// 	],
	// 	// });
	// 	alert(JSON.stringify(open));
	// 	const unsubscribe = navigation.addListener("beforeRemove", (e) => {
	// 		if (open === "on") return;
	// 		e.preventDefault();
	// 	});
	// 	return unsubscribe;
	// }, [navigation]);

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};
	const getRole = (id) => {
		if (id == 1) return "بعاتي";
		if (id == 2) return "شيخ الدمازين";
		if (id == 3) return "العمدة";
		if (id == 4) return "ست الودع";
		if (id == 5) return "أبو جنزير";
	};

	const habdleNavigate = () => {
		navigation.navigate("home");
		setRoomID(null);
		setJoinedPlayers1(null);
	};

	const renderPlayesList = () => {
		return joinedPlayers.map((player) => {
			return (
				<View key={player.playerId} style={styles.JoinedCon}>
					<Text style={{ color: "#e0e0e0" }}>
						{getRole(player.roleId)}
					</Text>
					<JoinedPlayer name={player.playerName} />
				</View>
			);
		});
	};
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.box}>
					<Text style={styles.text}>{whoWin}</Text>
					<View style={styles.listCon}>{renderPlayesList()}</View>
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
		padding: 10,
		marginBottom: 10,
		width: "80%",
		flexDirection: "row",
		// flex: 2,
		alignItems: "center",
		justifyContent: "flex-end",
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
	},
});

export default VillagersWins;
