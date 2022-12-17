import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import server from "../../api/server";
import { StackActions } from "@react-navigation/native";

const NewNight = ({ route, navigation }) => {
	const [player, setPlayer] = useState(null);
	const [loading, setloading] = useState(true);
	const [joinedPlayers, setJoinedPlayers] = useState(null);

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
		// alert(data);
		setJoinedPlayers(data.players);
		const findMe = findPlayer(data.players, myId);
		setPlayer(findMe[0]);
		setloading(!loading);
		// alert(player);
	};

	const findPlayer = (arr, myId) => {
		return arr.filter((player) => {
			return player.playerId === myId;
		});
	};
	useEffect(() => {
		getGame();
	}, []);

	const handleStartGame = async () => {
		// alert(JSON.stringify(route.params));
		const myId = await SecureStore.getItemAsync("id");
		const roleId = await SecureStore.getItemAsync("my_role");
		await server.post("/game/start", { gameId: route.params.roomId, myId });
		await server.post("/game/clearvote", { gameId: route.params.roomId });

		navigation.dispatch(
			StackActions.replace(`role${roleId}`, {
				joinedPlayers,
				roomId: route.params.roomId,
				MyId: myId,
				player,
			})
		);
		// console.log(player);
	};

	const out = () => {
		if (!player.inGame) {
			navigation.navigate("out");
		}
	};

	useEffect(() => {
		if (player) {
			out();
		}
	}, [player]);

	return (
		<View style={styles.container}>
			<Spinner visible={loading} textContent={"Loading..."} />
			<View>
				<Text style={styles.text}>ليلة جديدة</Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={handleStartGame}
					style={styles.loginBtn}
				>
					<Text style={styles.loginText}>التالي</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	text: {
		fontSize: 30,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
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
});

export default NewNight;
