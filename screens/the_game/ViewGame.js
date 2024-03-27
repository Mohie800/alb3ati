import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import JoinedPlayer from "../../components/JoinedPlayer";
import useStore from "../../store/store";
import { useInterval } from "../../common";
import server from "../../api/server";
import { Icon } from "@rneui/themed";
import Chat from "../Chat";

const ViewGame = ({ navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(null);
	const [whoWin, setWhoWin] = useState("loading");
	const [display, setDisplay] = useState(false);

	const setRoomID = useStore((state) => state.setRoomId);
	const roomId = useStore((state) => state.roomId);
	const setJoinedPlayers1 = useStore((state) => state.setJoinedPlayers);
	const joinedPlayers1 = useStore((state) => state.joinedPlayers);

	const getRole = (id) => {
		if (id == 1) return "بعاتي";
		if (id == 2) return "شيخ الدمازين";
		if (id == 3) return "العمدة";
		if (id == 4) return "ست الودع";
		if (id == 5) return "أبو جنزير";
	};

	const habdleNavigate = (e) => {
		e.preventDefault();
		navigation.navigate("home");
		setRoomID(null);
		setJoinedPlayers1(null);
	};

	const renderPlayesList = () => {
		return joinedPlayers1.map((player) => {
			return (
				<View key={player.playerId} style={styles.JoinedCon}>
					<Text style={{ color: "#e0e0e0" }}>
						{whoWin === "اللعبة مستمرة" || whoWin === "loading"
							? null
							: getRole(player.roleId)}
					</Text>
					<View>
						<JoinedPlayer name={player.playerName} />
						<View style={styles.check}>
							{!player.inGame && (
								<Icon
									name="close"
									type="fontawesome"
									color="#f13325"
								></Icon>
							)}
						</View>
					</View>
				</View>
			);
		});
	};

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers1(data.players);
		const getPlayers = inGamePlayers(data.players);
		if (getPlayers) {
			const hashmap = getPlayers.reduce((acc, val) => {
				acc[val] = (acc[val] || 0) + 1;
				return acc;
			}, {});
			const res = gameState(hashmap);
			if (res === "continue") {
				setWhoWin("اللعبة مستمرة");
			} else {
				setWhoWin(res);
			}
			// alert(JSON.stringify(hashmap));
		}
	};
	useInterval(() => getGame(), 3000);

	const inGamePlayers = (data) => {
		return data.map((player) => {
			if (player.inGame && player.roleId == 1) {
				return "ba3ati";
			} else if (player.inGame && player.roleId == 2) {
				return "villager";
			} else if (player.inGame && player.roleId == 3) {
				return "villager";
			} else if (player.inGame && player.roleId == 4) {
				return "villager";
			} else if (player.inGame && player.roleId == 5) {
				return "jenzeer";
			} else {
				return;
			}
		});
	};

	const gameState = (hash) => {
		if (hash.villager && hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (!hash.villager && hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (hash.villager && !hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (hash.villager && hash.ba3ati && !hash.jenzeer) {
			return "continue";
		} else if (hash.villager && !hash.ba3ati && !hash.jenzeer) {
			return "فاز القرويون";
		} else if (!hash.villager && hash.ba3ati && !hash.jenzeer) {
			return "فاز البعاعيت";
		} else if (!hash.villager && !hash.ba3ati && hash.jenzeer) {
			return "فاز أبو جنزير";
		} else if (!hash.villager && !hash.ba3ati && !hash.jenzeer) {
			return "مات الجميع";
		} else {
			return "no_Win";
		}
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={display ? styles.container1 : styles.displayNone}>
					<Chat display={display} />
				</View>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => setDisplay(!display)}
				>
					<Text style={styles.loginText}>
						{display ? "اخفاء الدردشة" : "إظهار الدردشة"}
					</Text>
				</TouchableOpacity>
				<View style={styles.box}>
					<Text style={styles.text}>{whoWin}</Text>
					<View style={styles.listCon}>{renderPlayesList()}</View>
					<View>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={(e) => habdleNavigate(e)}
						>
							<Text style={styles.loginText}>خروج</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default ViewGame;

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
		marginBottom: 20,
	},
	check: {
		position: "absolute",
		// height: "9%",
		// width: "20%",
		// backgroundColor: "green",
		bottom: "50%",
		borderRadius: 50,
		// right: "30%",
		alignSelf: "center",
	},
	container1: {
		flexGrow: 1,
		// justifyContent: "center",
		// alignItems: "center",
		width: 300,
		height: "30%",
	},

	displayNone: {
		// flexGrow: 1,
		// justifyContent: "center",
		// alignItems: "center",
		display: "none",
	},
});
