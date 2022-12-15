import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import server from "../../api/server";
import JoinedPlayer from "../../components/JoinedPlayer";
import * as SecureStore from "expo-secure-store";

const Victims = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);

	const [renVic, setRenVic] = useState(false);
	const [jenVic, setJenVic] = useState([]);
	const [noD, setnoD] = useState([]);

	useEffect(
		() =>
			navigation.addListener("beforeRemove", (e) => {
				e.preventDefault();
			}),
		[navigation]
	);

	// useEffect(() => alert(route.params), []);

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${route.params}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		// console.log(data.players);
	};

	const handleNext = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const fuck = async (playerId) => {
			await server.post("/game/outofthegame", {
				gameId: route.params.roomId,
				playerId: playerId,
			});
			// alert(data);
		};
		joinedPlayers.map((player) => {
			if (!player.isAlive) {
				fuck(player.playerId);
				// alert(player.playerId);
			}
		});

		await server.post("/game/notready", {
			gameId: route.params.roomId,
			myId,
		});

		navigation.navigate("vote", {
			joinedPlayers,
			roomId: route.params.roomId,
			MyId: myId,
		});
	};

	// const noD = [];

	const renderVictims = () => {
		return joinedPlayers.map((player) => {
			if (!player.isAlive || player.killedByDamazeen) {
				// noD.push(1);
				return (
					<View key={player.playerId} style={styles.player}>
						<JoinedPlayer name={player.playerName} vic={1} />
					</View>
				);
			}
		});
	};

	// const jenVic = [];

	const renderJenzeerVictim = () => {
		return joinedPlayers.map((player) => {
			if (player.killedByjenzeer) {
				// jenVic.push(1);
				// setJenVic([1]);
				return (
					<View key={player.playerId} style={styles.player2}>
						<View style={styles.textCont}>
							<Text style={styles.text2}>
								ضحية سقطت في يد أبو جنزير
							</Text>
						</View>
						<JoinedPlayer name={player.playerName} vic={1} />
					</View>
				);
			}
		});
	};

	const JenzeerVictim = () => {
		return joinedPlayers.map((player) => {
			if (player.killedByjenzeer) {
				setnoD([1]);
				setJenVic([1]);
			}
		});
	};

	const Victim = () => {
		const fuck = async (playerId) => {
			await server.post("/game/outofthegame", {
				gameId: route.params.roomId,
				playerId: playerId,
			});
			// alert(data);
		};
		return joinedPlayers.map((player) => {
			if (!player.isAlive || player.killedByDamazeen) {
				setnoD([1]);
				fuck(player.playerId);
			}
		});
	};

	useEffect(() => {
		JenzeerVictim();
		Victim();
	}, [joinedPlayers]);

	const noDie = () => {
		return <Text style={styles.text}>لم يمت أحد</Text>;
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View>
					<Text style={styles.text}>ضحايا اليوم</Text>
				</View>
				<View>{joinedPlayers && renderVictims()}</View>
				{noD.length == 0 && noDie()}
				{jenVic.length != 0 && renderJenzeerVictim()}
				<View>
					<TouchableOpacity
						style={styles.loginBtn}
						onPress={() => handleNext()}
					>
						<Text style={styles.loginText}>التالي</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
	},
	text: {
		fontSize: 30,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
	},
	textCont: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	text2: {
		fontSize: 30,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
		color: "#ffffff",
		width: "90%",
	},
	player: {
		width: "50%",
	},
	player2: {
		width: "70%",
		backgroundColor: "#df6969",
		borderRadius: 25,
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

export default Victims;
