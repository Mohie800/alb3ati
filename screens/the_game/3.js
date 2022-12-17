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
import Spinner from "react-native-loading-spinner-overlay/lib";
import { StackActions } from "@react-navigation/native";

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(null);

	const [target, setTarget] = useState(null);
	const [player, setPlayer] = useState({});
	const [loading, setloading] = useState(true);

	// useEffect(
	// 	() =>
	// 		navigation.addListener("beforeRemove", (e) => {
	// 			e.preventDefault();
	// 		}),
	// 	[navigation]
	// );

	const findPlayer = (arr) => {
		return arr.filter((player) => {
			return player.playerId === route.params.MyId;
		});
	};

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${route.params.roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		setloading(!loading);
		const findMe = findPlayer(data.players);
		setPlayer(findMe[0]);
	};

	const handleProtect = async () => {
		const { data } = await server.post("/game/protectone", {
			gameId: route.params.roomId,
			playerId: target,
			myId: route.params.MyId,
		});
		navigation.dispatch(
			StackActions.replace("ready", {
				roomId: route.params.roomId,
				joinedPlayers,
			})
		);
	};

	useEffect(() => {
		getGame();
	}, []);

	const Item = ({ item }) => {
		if (item.playerId != player.al3omdaProtect && item.inGame) {
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
		<View style={Styles.container}>
			<Spinner visible={loading} textContent={"Loading..."} />
			<View style={Styles.viewArea}>
				<View style={Styles.head}>
					<Image
						source={require("../../assets/al3omda.png")}
						style={Styles.rolePic}
					/>
					<Text style={Styles.text}>العمدة</Text>
				</View>
				<View>
					<View style={Styles.scrollArea}>
						<View style={Styles.scrollArea_contentContainerStyle}>
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
						style={Styles.loginBtn}
						onPress={handleProtect}
					>
						<Text style={Styles.loginText}>حماية</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
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
		borderWidth: 3,
		borderColor: "#000000",
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
		overflow: "visible",
		flex: 3,
	},
	item: {
		flex: 1,
		alignItems: "center",
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
	text: {
		fontSize: 20,
		padding: 5,
		fontFamily: "a-massir-ballpoint",
	},
});

export default GamePage;
