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
	Modal,
} from "react-native";
import JoinedPlayer from "../components/JoinedPlayer";
import server from "../api/server";
import * as SecureStore from "expo-secure-store";
import { useInterval } from "../common";
import useStore from "../store/store";
import InviteFriends from "./friends/InviteFriends";

export default function Host({ navigation }) {
	const [lastPong, setLastPong] = useState(true);
	const [player, setPlayer] = useState({});
	const [MyId, setMyId] = useState(null);
	const [toggleModal, setToggleModal] = useState(false);

	const isUser = useStore((state) => state.isUser);
	const setRoomID = useStore((state) => state.setRoomId);
	const RoomID = useStore((state) => state.roomId);
	const joinedPlayers = useStore((state) => state.joinedPlayers);
	const setJoinedPlayers = useStore((state) => state.setJoinedPlayers);
	const setGame = useStore((state) => state.setGame);
	const setUser = useStore((state) => state.setPlayerObj);

	const handleCreateGame = async () => {
		const playerName = await SecureStore.getItemAsync("name");
		const playerId = await SecureStore.getItemAsync("id");

		setMyId(playerId);

		const game = await server.post("/game/create", {
			gameId: RoomID,
			playerName,
			playerId,
		});
		setLastPong(!lastPong);
	};

	useEffect(() => {
		const roomId = Math.random().toString().substring(2, 9);
		setJoinedPlayers([]);
		setRoomID(roomId);
	}, []);

	useEffect(() => {
		if (RoomID) {
			handleCreateGame();
		}
	}, [RoomID]);

	const getGame = async () => {
		try {
			const { data } = await server
				.get(`/game/${RoomID}`)
				.catch((e) => console.log(e));
			const id = await SecureStore.getItemAsync("id");
			const me = data.players.filter((p) => p.playerId === id);
			setPlayer(me[0]);
			setUser(me[0]);

			if (data) setJoinedPlayers(data.players);
		} catch (error) {
			console.log(error);
		}
	};
	useInterval(() => getGame(), 3000);

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const handleStartGame = async () => {
		if (player.started) {
			alert("غير مسموح");
			return;
		}
		await server.post("/game/gamestarted", { gameId: RoomID });
		navigation.navigate(`customRoles`, {
			joinedPlayers,
			RoomID,
			MyId,
		});
	};

	const Item = ({ item }) => {
		return (
			<View style={styles.item}>
				<JoinedPlayer name={item.playerName} />
			</View>
		);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Spinner visible={lastPong} textContent={"Loading..."} />
				<Modal
					animationType="slide"
					transparent={true}
					visible={toggleModal}
					onRequestClose={() => setToggleModal(!toggleModal)}
				>
					<InviteFriends
						gameId={RoomID}
						closeModal={setToggleModal}
					/>
				</Modal>
				{/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

				<StatusBar style="auto" />
				<View>
					<View style={styles.rect}>
						<View style={styles.loremIpsum2Row}>
							<Text style={styles.text}>
								رمز الاستضافة الخاص بك هو :
							</Text>
							<Text selectable={true} style={styles.text1}>
								{RoomID}
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

				{isUser && (
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={() => setToggleModal(true)}
					>
						<Text style={styles.loginText}>دعوة أصدقاء</Text>
					</TouchableOpacity>
				)}
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => handleStartGame()}
				>
					<Text style={styles.loginText}>التالي</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
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
