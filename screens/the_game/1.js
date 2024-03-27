import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	TouchableOpacity,
	BackHandler,
	Image,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import { useEffect, useState } from "react";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";
import { StackActions } from "@react-navigation/native";

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [target, setTarget] = useState(null);
	const [MyId, setMyId] = useState(route.params.MyId);

	// useEffect(
	// 	() =>
	// 		navigation.addListener("beforeRemove", (e) => {
	// 			e.preventDefault();
	// 		}),
	// 	[navigation]
	// );

	const handleKill = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server.post("/game/kill", {
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

	// useEffect(() => {
	// 	const getId = async () => {
	// 		const myId1 = await SecureStore.getItemAsync("id");
	// 		setMyId(myId1);
	// 	};
	// }, []);

	const handleSelect = (item) => {
		if (item.roleId == 1) return;
		setTarget(item.playerId);
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
						{item.roleId == 1 && (
							<Image
								source={require("../../assets/adapt1.png")}
								style={Styles.check}
							/>
						)}
					</View>
				</TouchableOpacity>
			);
		}
	};

	return (
		<ScrollView>
			<View style={Styles.container}>
				<View style={Styles.viewArea}>
					<View style={Styles.head}>
						{/* <View style={Styles.rolePic}></View> */}
						<Image
							source={require("../../assets/adapt1.png")}
							style={Styles.rolePic}
						/>
						<Text style={Styles.text}>بعاتي</Text>
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
					<View>
						<TouchableOpacity
							style={Styles.loginBtn}
							onPress={handleKill}
						>
							<Text style={Styles.loginText}>قتل</Text>
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
		backgroundColor: "#f51a1a",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
		borderWidth: 5,
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
	check: {
		position: "absolute",
		height: "18.1%",
		width: "20%",
		backgroundColor: "#f51a1a",
		bottom: 50,
		borderRadius: 50,
		right: 20,
		alignSelf: "flex-end",
	},
	text: {
		fontSize: 20,
		padding: 5,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
	},
});

export default GamePage;
