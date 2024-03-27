import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useInterval } from "../../common";

import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";
import useStore from "../../store/store";

export default function Host({ route, navigation }) {
	const [isConnected, setIsConnected] = useState(null);
	const [lastPong, setLastPong] = useState(null);
	const [roomId, setRoomId] = useState(null);
	const [itemData, setItemData] = useState([]);
	const [player, setPlayer] = useState({});
	const [MyId, setMyId] = useState(null);
	const [startGame, setStartGame] = useState(null);
	const [nonDisplay, setNonDispay] = useState(false);

	const setRoomID = useStore((state) => state.setRoomId);
	const joinedPlayers = useStore((state) => state.joinedPlayers);
	const setJoinedPlayers = useStore((state) => state.setJoinedPlayers);
	const setUser = useStore((state) => state.setPlayerObj);

	useEffect(() => {
		if (route.params.gameId) {
			setRoomId(route.params?.gameId);
			setLastPong(true);
			setNonDispay(true);
			setRoomID(route.params.gameId);
		}
	}, []);

	useEffect(() => {
		setJoinedPlayers([]);
	}, []);

	const handleCreateGame = async () => {
		const playerName = await SecureStore.getItemAsync("name");
		const id = await SecureStore.getItemAsync("id");
		const game = await server.post("/game/join", {
			gameId: roomId,
			playerName,
			playerId: id,
		});
		if (game.data) {
			setLastPong(true);
			alert(game.data);
			setRoomID(roomId);
		}
	};

	const handleStartGame = async () => {
		const myId = await SecureStore.getItemAsync("id");
		if (player.started) {
			alert("غير مسموح");
			return;
		}

		navigation.navigate(`chat`, {
			joinedPlayers,
			roomId,
			MyId: myId,
			player: player,
		});
	};

	const getGame = async () => {
		const id = await SecureStore.getItemAsync("id");
		if (!lastPong) return;
		const { data } = await server
			.get(`/game/${roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		const me = data.players.filter((p) => p.playerId === id);
		setPlayer(me[0]);
		setUser(me[0]);
		setMyId(id);
		setStartGame(data.startGame);
	};
	useInterval(() => getGame(), 3000);

	const Item = ({ item }) => {
		return (
			<View style={styles.item}>
				<JoinedPlayer name={item.playerName} />
			</View>
		);
	};

	useEffect(() => {
		if (startGame) {
			navigation.navigate(`new`, {
				roomId,
			});
		}
	}, [startGame]);

	const setManualRoomId = (e) => {
		setRoomId(e);
		setRoomID(e);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<StatusBar style="auto" />
				<View>
					<View style={nonDisplay ? styles.non : styles.rect}>
						<View style={styles.loremIpsum2Row}>
							<Text style={styles.text1}>
								أدخل رمز الاستضافة :
							</Text>
							<TextInput
								style={styles.text}
								onChangeText={(e) => setManualRoomId(e)}
							/>
						</View>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => handleCreateGame()}
						>
							<Text style={styles.loginText}>انضمام</Text>
						</TouchableOpacity>
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

				{/* <TouchableOpacity
					style={styles.loginBtn}
					onPress={() => handleStartGame()}
				>
					<Text style={styles.loginText}>ابدأ اللعبة</Text>
				</TouchableOpacity> */}
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},

	image: {
		marginBottom: 40,
	},

	text: {
		paddingTop: 10,
		height: 40,
		borderColor: "#ffffff",
		borderWidth: 2,
		width: "90%",
		borderRadius: 25,
		color: "#fff",
		width: 150,
		padding: 10,
	},

	text1: {
		paddingTop: 10,
		height: 40,
		width: "90%",
		color: "#fff",
		width: 150,
		padding: 10,
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
		height: 195,
		backgroundColor: "#7b8cf7",
		borderRadius: 15,
		flexDirection: "row",
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	loremIpsum2Row: {
		height: 17,
		flexDirection: "column",
		flex: 1,
		marginRight: 15,
		justifyContent: "center",
		alignItems: "center",
		color: "#fff",
	},
	scrollArea: {
		width: "80%",
		height: 319,
		backgroundColor: "#7b8cf7",
		borderRadius: 22,
		marginTop: 40,
	},
	scrollArea_contentContainerStyle: {
		width: 269,
		overflow: "visible",
		flex: 3,
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",
		padding: 10,
	},
	non: {
		width: 269,
		height: 195,
		backgroundColor: "#7b8cf7",
		borderRadius: 15,
		flexDirection: "row",
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		display: "none",
	},
});
