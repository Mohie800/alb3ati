import {
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	Image,
} from "react-native";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";
import { StackActions } from "@react-navigation/native";

function ViewRole({ route, navigation }) {
	const [RoleName, setRoleName] = useState(null);
	const [roleId, setRoleId] = useState(String(route.params.roleId));
	const [playerName, setPlayerName] = useState(route.params.playerName);
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);
	const [image, setImage] = useState(null);

	// useEffect(
	// 	() =>
	// 		navigation.addListener("beforeRemove", (e) => {
	// 			e.preventDefault();
	// 		}),
	// 	[navigation]
	// );

	const getRoleName = () => {
		switch (roleId) {
			case "1":
				setRoleName("بعاتي");
				setImage(img[0]);
				break;
			case "2":
				setRoleName("شيخ الدمازين");
				setImage(img[1]);
				break;
			case "3":
				setRoleName("العمدة");

				setImage(img[2]);
				break;
			case "4":
				setRoleName("ست الودع");
				setImage(img[3]);
				break;
			case "5":
				setRoleName("أبو جنزير");
				setImage(img[4]);
				break;
			default:
				"error";
		}
	};

	const img = [
		require("../../assets/adapt.png"),
		require("../../assets/damazeen.png"),
		require("../../assets/al3omda.png"),
		require("../../assets/eye-sw.png"),
		require("../../assets/jenzeer.jpg"),
	];

	const handleNext = async () => {
		// alert(JSON.stringify(data));
		const myId = await SecureStore.getItemAsync("id");
		await server.post("game/raedy", {
			gameId: route.params.roomId,
			myId,
		});
		navigation.dispatch(
			StackActions.replace("ready", {
				roomId: route.params.roomId,
				joinedPlayers,
				nightNum: route.params.nightNum,
			})
		);
	};

	useEffect(() => {
		getRoleName();
		// alert(RoleName);
	}, []);
	return (
		<View style={Styles.container}>
			<View style={Styles.viewArea}>
				<View style={Styles.head}>
					<Text style={Styles.firstText}>
						دور اللاعب {playerName} :
					</Text>
					<Image source={image} style={Styles.rolePic} />
					<Text>{RoleName}</Text>
				</View>
				<View></View>
				<View>
					<TouchableOpacity
						style={Styles.loginBtn}
						onPress={handleNext}
					>
						<Text style={Styles.loginText}>التالي</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

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
		overflow: "visible",
		flex: 3,
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
	viewArea: {
		justifyContent: "center",
		alignItems: "center",
	},
	firstText: {
		fontSize: 30,
		fontFamily: "a-massir-ballpoint",
		marginTop: 30,
	},
});

export default ViewRole;
