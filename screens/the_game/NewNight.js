import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay/lib";
import server from "../../api/server";
import { StackActions } from "@react-navigation/native";
import useStore from "../../store/store";
import { Audio } from "expo-av";

const NewNight = ({ route, navigation }) => {
	const [player, setPlayer] = useState(null);
	const [loading, setloading] = useState(true);
	const [joinedPlayers, setJoinedPlayers] = useState(null);
	const [nightNum, setNightNum] = useState(route.params.nightNum || 1);
	const [sound, setSound] = useState();

	const RoomID = useStore((state) => state.roomId);
	const playerObj = useStore((state) => state.playerObj);

	async function playSound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/sound/suspend.mp3")
		);
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	}

	useEffect(() => {
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

	const getGame = async () => {
		try {
			const myId = await SecureStore.getItemAsync("id");
			const { data } = await server
				.get(`/game/${RoomID}`)
				.catch((e) => console.log(e));
			setJoinedPlayers(data.players);
			const findMe = findPlayer(data.players, myId);
			setPlayer(findMe[0]);
			setloading(!loading);
		} catch (error) {
			// alert(JSON.stringify(error));
			console.log(error);
		}
	};

	const findPlayer = (arr, myId) => {
		return arr.filter((player) => {
			return player.playerId === myId;
		});
	};
	useEffect(() => {
		playSound();
		getGame();
	}, []);

	const handleStartGame = async () => {
		const myId = await SecureStore.getItemAsync("id");
		await server.post("/game/start", { gameId: route.params.roomId, myId });
		await server.post("/game/clearvote", { gameId: route.params.roomId });

		navigation.dispatch(
			StackActions.replace(`role${playerObj.roleId}`, {
				joinedPlayers,
				roomId: RoomID,
				MyId: myId,
				player,
				nightNum,
			})
		);
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
			<View style={styles.box}>
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
		color: "#e0e0e0",
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
	box: {
		alignItems: "center",
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
	},
});

export default NewNight;
