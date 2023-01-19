import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import { useEffect, useState } from "react";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { StackActions } from "@react-navigation/native";

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState();
	//route.params.joinedPlayers
	const [target, setTarget] = useState(null);
	const [roomId, setRoomId] = useState(route.params.roomId);
	const [player, setPlayer] = useState({});
	const [loading, setloading] = useState(true);

	// useEffect(
	// 	() =>
	// 		navigation.addListener("beforeRemove", (e) => {
	// 			e.preventDefault();
	// 		}),
	// 	[navigation]
	// );

	const handleKill = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server.post("/game/killdamazeen", {
			gameId: route.params.roomId,
			playerId: target,
			myId,
			nightNum: route.params.nightNum,
		});
		navigation.dispatch(
			StackActions.replace("ready", {
				roomId: route.params.roomId,
				joinedPlayers,
				nightNum: route.params.nightNum,
			})
		);
	};

	const handleProtectAll = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server.post("/game/protectall", {
			gameId: route.params.roomId,
			myId,
		});
		navigation.dispatch(
			StackActions.replace("ready", {
				roomId: route.params.roomId,
				joinedPlayers,
			})
		);
	};

	const handleNext = async () => {
		const myId = await SecureStore.getItemAsync("id");
		await server.post("game/raedy", {
			gameId: route.params.roomId,
			myId,
			// nightNum: route.params.nightNum
		});
		navigation.dispatch(
			StackActions.replace("ready", {
				roomId: route.params.roomId,
				joinedPlayers,
				nightNum: route.params.nightNum,
			})
		);
	};

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		setloading(!loading);
		const findMe = findPlayer(data.players);
		setPlayer(findMe[0]);
	};

	const findPlayer = (arr) => {
		return arr.filter((player) => {
			return player.playerId === route.params.MyId;
		});
	};

	useEffect(() => {
		getGame();
	}, []);

	const Item = ({ item }) => {
		if (item.playerId !== route.params.MyId && item.inGame) {
			return (
				<TouchableOpacity onPress={() => setTarget(item.playerId)}>
					<View
						style={
							item.playerId == target
								? Styles.itemTarget
								: Styles.item
						}
					>
						<JoinedPlayer name={item.playerName} />
					</View>
				</TouchableOpacity>
			);
		}
	};

	return (
		<ScrollView>
			<View style={Styles.container}>
				<Spinner visible={loading} textContent={"Loading..."} />
				<View style={Styles.viewArea}>
					<View style={Styles.head}>
						<Image
							source={require("../../assets/damazeen.png")}
							style={Styles.rolePic}
						/>
						<Text style={Styles.text}>شيخ الدمازين</Text>
					</View>
					<View>
						<View style={Styles.scrollArea}>
							<View
								style={Styles.scrollArea_contentContainerStyle}
							>
								<FlatList
									data={joinedPlayers}
									numColumns={3}
									renderItem={Item}
								/>
							</View>
						</View>
					</View>
					<View style={Styles.btnGroup}>
						<TouchableOpacity
							style={
								player.damazeenProtect
									? Styles.disabledloginBtn
									: Styles.loginBtn
							}
							onPress={handleProtectAll}
							disabled={player.damazeenProtect}
						>
							<Text style={Styles.loginText}>حجاب</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={
								player.damazeenKill
									? Styles.disabledloginBtn
									: Styles.loginBtn
							}
							onPress={handleKill}
							disabled={player.damazeenKill}
						>
							<Text style={Styles.loginText}>كجور</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={Styles.loginBtn}
							onPress={handleNext}
						>
							<Text style={Styles.loginText}>تخطي</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const Styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
	},
	rolePic: {
		// backgroundColor: "#945151",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
		borderWidth: 5,
		// borderColor: "#1f30a0",
	},
	head: {
		alignItems: "center",
	},
	scrollArea: {
		width: "100%",
		height: 319,
		backgroundColor: "#7b8cf7",
		borderRadius: 22,
		marginTop: 40,
		// marginLeft: 53,
	},
	scrollArea_contentContainerStyle: {
		// height: 319,
		width: 290,
		// flexDirection: "row",
		overflow: "scroll",
		alignItems: "center",
		// flex: 1,
	},
	item: {
		flex: 1,
		// maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		// padding: 10,
		// backgroundColor: "rgba(249, 180, 45, 0.25)",
		// borderWidth: 1.5,
		// borderColor: "#fff",
	},
	itemTarget: {
		flex: 1,
		// maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		// padding: 10,
		backgroundColor: "rgba(249, 180, 45, 0.25)",
		// borderWidth: 1.5,
		// borderColor: "#fff",
		borderColor: "#fff",
		borderWidth: 3,
		borderRadius: 22,
	},
	loginBtn: {
		width: 70,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f30a0",
		bottom: 20,
		marginHorizontal: 10,
	},
	disabledloginBtn: {
		width: 70,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		bottom: 20,
		marginHorizontal: 10,
		backgroundColor: "#6b6b6b",
	},
	loginText: {
		color: "#fff",
	},
	viewArea: {
		justifyContent: "center",
		alignItems: "center",
	},
	btnGroup: {
		flexDirection: "row",
	},
	text: {
		fontSize: 20,
		padding: 5,
		fontFamily: "a-massir-ballpoint",
	},
});

export default GamePage;
