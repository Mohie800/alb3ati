import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Spinner from "react-native-loading-spinner-overlay/lib";

import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import JoinedPlayer from "../components/JoinedPlayer";
import server from "../api/server";
import * as SecureStore from "expo-secure-store";
import { useInterval } from "../common";

export default function Host({ navigation }) {
	const [isConnected, setIsConnected] = useState(null);
	const [lastPong, setLastPong] = useState(true);
	const [roomId, setRoomId] = useState(
		Math.random().toString().substring(2, 9)
	);
	const [joinedPlayers, setJoinedPlayers] = useState([]);
	const [player, setPlayer] = useState({});
	const [itemData, setItemData] = useState([]);
	const [MyId, setMyId] = useState(null);

	// const socket = io("https://eager-ruby-pinafore.cyclic.app"); //.connect("https://eager-ruby-pinafore.cyclic.app");

	// useEffect(() => {
	// 	socket.on("connect", () => {
	// 		alert("zoot");
	// 		setIsConnected(true);
	// 	});

	// 	socket.on("disconnect", () => {
	// 		setIsConnected(false);
	// 	});
	// 	socket.emit("create", roomId);
	// 	socket.on("joined", (data) => {
	// 		alert(data);
	// 	});
	// 	return () => {
	// 		socket.off("connect");
	// 		socket.off("disconnect");
	// 	};
	// }, []);

	// useEffect(() => {
	// 	socket.on("joined", (data) => {
	// 		console.log(data);
	// 		alert(data);
	// 	});
	// }, [socket]);

	const role = () => {
		const roleId = Math.random();
		if (roleId < 0.08) {
			return 5;
		} else if (roleId < 0.12) {
			return 4;
		} else if (roleId < 0.31) {
			return 1;
		} else if (roleId < 0.29) {
			return 3;
		} else {
			return 2;
		}
	};

	const handleCreateGame = async () => {
		const playerName = await SecureStore.getItemAsync("name");
		const playerId = await SecureStore.getItemAsync("id");

		setMyId(playerId);

		// alert(playerName);
		const game = await server.post("/game/create", {
			gameId: roomId,
			playerName,
			roleId: role(),
			playerId,
		});
		// alert(JSON.stringify(game.data));
		// if (game.data) {
		setLastPong(!lastPong);
		// alert(lastPong);
		// }
	};
	useEffect(() => {
		if (roomId) {
			handleCreateGame();
		}
	}, [roomId]);
	useEffect(() => {
		// if (joinedPlayers) {
		// 	setLastPong(false);
		// }
	}, [joinedPlayers]);
	const assignRoles = async () => {
		// const playerName = await SecureStore.getItemAsync("name");
		// alert(playerName);
		const game = await server.post("/game/assign", {
			gameId: roomId,
		});
		alert(JSON.stringify(game.data));
	};

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		const id = await SecureStore.getItemAsync("id");
		const me = data.players.filter((p) => p.playerId === id);
		setPlayer(me[0]);
		// console.log(data.players);
		// setLastPong(true);
	};
	useInterval(() => getGame(), 6000);

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const handleStartGame = () => {
		saveToken("my_role", player.roleId);
		navigation.navigate(`new`, {
			joinedPlayers,
			roomId,
			MyId,
		});
		// console.log(player);
	};

	const Item = ({ item }) => {
		return (
			<View style={styles.item}>
				<JoinedPlayer name={item.playerName} />
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<Spinner visible={lastPong} textContent={"Loading..."} />
			{/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

			<StatusBar style="auto" />
			<View>
				<View style={styles.rect}>
					<View style={styles.loremIpsum2Row}>
						<Text style={styles.text}>
							رمز الاستضافة الخاص بك هو :
						</Text>
						<Text selectable={true} style={styles.text1}>
							{roomId}
						</Text>
					</View>
				</View>
				<View style={styles.scrollArea}>
					<View style={styles.scrollArea_contentContainerStyle}>
						<FlatList
							data={joinedPlayers}
							numColumns={4}
							renderItem={Item}
						/>
					</View>
				</View>
			</View>

			<TouchableOpacity
				style={styles.loginBtn}
				onPress={() => handleStartGame()}
			>
				<Text style={styles.loginText}>ابدأ اللعبة</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},

	image: {
		marginBottom: 40,
	},

	text: {
		paddingTop: 10,
		height: 40,
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},

	text1: {
		paddingTop: 10,
		height: 40,
		color: "#fff",
		// fontFamily: "a-massir-ballpoint",
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
		color: "#fff",
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	rect: {
		width: 269,
		height: 95,
		backgroundColor: "#7b8cf7",
		borderRadius: 15,
		flexDirection: "row",
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		// marginLeft: 53,
	},
	loremIpsum2Row: {
		height: 17,
		flexDirection: "column",
		flex: 1,
		marginRight: 15,
		// marginLeft: 64,
		// marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		color: "#ffffff",
	},
	scrollArea: {
		width: "80%",
		height: 319,
		backgroundColor: "#7b8cf7",
		borderRadius: 22,
		marginTop: 40,
		// marginLeft: 53,
	},
	scrollArea_contentContainerStyle: {
		// height: 319,
		width: 269,
		// flexDirection: "row",
		overflow: "visible",
		flex: 3,
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		padding: 10,
		// backgroundColor: "rgba(249, 180, 45, 0.25)",
		// borderWidth: 1.5,
		// borderColor: "#fff",
	},
});
