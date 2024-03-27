import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	TouchableOpacity,
	BackHandler,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import { useEffect, useState } from "react";
import server from "../../api/server";
import Spinner from "react-native-loading-spinner-overlay/lib";
import * as SecureStore from "expo-secure-store";
import { StackActions } from "@react-navigation/native";

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(null);
	const [name, setName] = useState(null);
	const [target, setTarget] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [player, setPlayer] = useState(null);
	const [loading, setloading] = useState(true);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("beforeRemove", (e) => {
	// 		e.preventDefault();
	// 		// if (!nav) navigation.dispatch(e.data.action);
	// 	});
	// 	return unsubscribe;
	// }, [navigation]);

	const getGame = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server
			.get(`/game/${route.params.roomId}`)
			.catch((e) => console.log(e));
		// setvotes(data.votes);
		setJoinedPlayers(data.players);
		const findMe = findPlayer(data.players, myId);
		setPlayer(findMe[0]);
		setloading(!loading);
	};

	const findPlayer = (arr, myId) => {
		return arr.filter((player) => {
			return player.playerId === myId;
		});
	};
	useEffect(() => {
		getGame();
	}, []);

	const handleVote = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server.post("/game/vote", {
			gameId: route.params.roomId,
			playerId: target,
			myId,
		});
		navigation.dispatch(
			StackActions.replace("votesready", {
				roomId: route.params.roomId,
				nightNum: route.params.nightNum,
			})
		);
	};

	useEffect(() => {
		const n = async () => {
			await SecureStore.getItemAsync("name").then((x) => setName(x));
		};
		n();
		//   return () => {
		//     second
		//   }
	}, [name]);

	const out = () => {
		if (!player.inGame) {
			navigation.dispatch(StackActions.replace("out"));
		}
	};

	useEffect(() => {
		if (player) {
			out();
		}
	}, [player]);

	const handleSelect = (item) => {
		setTarget(item.playerId);
		setDisabled(false);
	};

	const Item = ({ item }) => {
		if (item.playerId != route.params.MyId && item.inGame) {
			return (
				<TouchableOpacity onPress={() => handleSelect(item)}>
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
					{/* <View style={Styles.head}>
						<View style={Styles.rolePic}></View>
						<Text>{name}</Text>
					</View> */}
					<View>
						<View style={Styles.scrollArea}>
							<View
								style={Styles.scrollArea_contentContainerStyle}
							>
								<FlatList
									data={joinedPlayers}
									numColumns={4}
									renderItem={Item}
								/>
							</View>
						</View>
					</View>
					<View>
						<TouchableOpacity
							style={
								disabled
									? Styles.disabledloginBtn
									: Styles.loginBtn
							}
							onPress={handleVote}
							disabled={disabled}
						>
							<Text style={Styles.loginText}>صوّت</Text>
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
		backgroundColor: "#945151",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
	},
	head: {
		alignItems: "center",
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
		width: 290,
		// flexDirection: "row",
		overflow: "visible",
		flex: 3,
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
		borderColor: "#b42121",
		borderWidth: 3,
		borderRadius: 22,
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
	},
	viewArea: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GamePage;
