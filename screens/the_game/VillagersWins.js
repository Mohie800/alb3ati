import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";

const VillagersWins = ({ route, navigation }) => {
	const [whoWin, setWhoWin] = useState(route.params.win);
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [nav, setNav] = useState(true);

	useEffect(
		() =>
			navigation.addListener("beforeRemove", (e) => {
				if (!nav) {
					return;
				}
				e.preventDefault();
			}),
		[navigation, nav]
	);

	// useEffect(() => {
	// 	alert(JSON.stringify(route.params));
	// }, []);

	const getRole = (id) => {
		if (id == 1) return "بعاتي";
		if (id == 2) return "شيخ الدمازين";
		if (id == 3) return "العمدة";
		if (id == 4) return "ست الودع";
		if (id == 5) return "أبو جنزير";
	};

	const habdleNavigate = () => {
		setNav(false);
		alert(nav);
		navigation.navigate("home");
	};

	const renderPlayesList = () => {
		return joinedPlayers.map((player) => {
			return (
				<View key={player.playerId} style={styles.JoinedCon}>
					{/* <JoinedPlayer /> */}
					<Text>{getRole(player.roleId)}</Text>
					<Text>{` -- ${player.playerName}`}</Text>
					<View style={styles.pic}></View>
				</View>
			);
		});
	};
	return (
		<View style={styles.container}>
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
		flexDirection: "row",
		// flex: 2,
		alignItems: "center",
		// justifyContent: "center",
	},
	text: {
		fontSize: 50,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
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
});

export default VillagersWins;
