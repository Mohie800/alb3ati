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
import { useState, useEffect } from "react";
import server from "../../api/server";
import { StackActions } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [target, setTarget] = useState(null);
	const [disabled, setDisabled] = useState(true);

	const handleSelect = (playerId) => {
		setTarget(playerId);
		setDisabled(false);
	};
	const Item = ({ item }) => {
		if (item.playerId != route.params.MyId && item.inGame) {
			return (
				<TouchableOpacity onPress={() => handleSelect(item.playerId)}>
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

	const handleKill = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server.post("/game/killjenzeer", {
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

	return (
		<ScrollView>
			<View style={Styles.container}>
				<View style={Styles.viewArea}>
					<View style={Styles.head}>
						<View>
							<Image
								source={require("../../assets/jenzeer2.png")}
								style={Styles.rolePic}
							/>
						</View>
						<Text style={Styles.text}>أبو جنزير</Text>
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
							style={
								disabled
									? Styles.disabledloginBtn
									: Styles.loginBtn
							}
							onPress={handleKill}
							disabled={disabled}
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
		backgroundColor: "#945151",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
		// borderWidth: 5,
		borderColor: "#000000",
	},
	imgCont: {
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
		// borderWidth: 5,
		borderColor: "#000000",
		backgroundColor: "#000000",
		overflow: "hidden",
		paddingRight: 10,
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
	text: {
		fontSize: 20,
		padding: 5,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
	},
});

export default GamePage;
