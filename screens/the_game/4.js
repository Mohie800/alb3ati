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

const GamePage = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [target, setTarget] = useState(null);
	const [exposed, setExposed] = useState(null);
	const [playerName, setPlayerName] = useState(null);

	// useEffect(
	// 	() =>
	// 		navigation.addListener("beforeRemove", (e) => {
	// 			e.preventDefault();
	// 		}),
	// 	[navigation]
	// );

	const exposeRole = async () => {
		// alert(exposed);
		navigation.dispatch(
			StackActions.replace("viewrole", {
				roleId: exposed,
				playerName,
				joinedPlayers,
				roomId: route.params.roomId,
				nightNum: route.params.nightNum,
			})
		);
	};
	const handleSelect = (item) => {
		setTarget(item.playerId);
		setExposed(item.roleId);
		setPlayerName(item.playerName);
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
				<View style={Styles.viewArea}>
					<View style={Styles.head}>
						<Image
							source={require("../../assets/eye-sw.png")}
							style={Styles.rolePic}
						/>
						<Text style={Styles.text}>ست الودع</Text>
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
							onPress={exposeRole}
						>
							<Text style={Styles.loginText}>اكشف الدور</Text>
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
		borderWidth: 3,
		borderColor: "#1f30a0",
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
	text: {
		fontSize: 20,
		padding: 1,
		fontFamily: "a-massir-ballpoint",
	},
});

export default GamePage;
