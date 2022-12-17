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
import { StackActions } from "@react-navigation/native";

const Victims = ({ route, navigation }) => {
	const [joinedPlayers, setJoinedPlayers] = useState(
		route.params.joinedPlayers
	);

	const [renVic, setRenVic] = useState(false);
	const [jenVic, setJenVic] = useState([]);
	const [noD, setnoD] = useState([]);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("beforeRemove", (e) => {
	// 		e.preventDefault();
	// 		// if (!nav) navigation.dispatch(e.data.action);
	// 	});
	// 	return unsubscribe;
	// }, [navigation]);

	// useEffect(() => alert(route.params), []);

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${route.params}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		// console.log(data.players);
	};

	const inGamePlayers = (data) => {
		return data.map((player) => {
			if (player.inGame && player.roleId == 1) {
				return "ba3ati";
			} else if (player.inGame && player.roleId == 2) {
				return "villager";
			} else if (player.inGame && player.roleId == 3) {
				return "villager";
			} else if (player.inGame && player.roleId == 4) {
				return "villager";
			} else if (player.inGame && player.roleId == 5) {
				return "jenzeer";
			} else {
				return;
			}
		});
	};

	const gameState = (hash) => {
		if (hash.villager && hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (!hash.villager && hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (hash.villager && !hash.ba3ati && hash.jenzeer) {
			return "continue";
		} else if (hash.villager && hash.ba3ati && !hash.jenzeer) {
			return "continue";
		} else if (hash.villager && !hash.ba3ati && !hash.jenzeer) {
			return "فاز القرويون";
		} else if (!hash.villager && hash.ba3ati && !hash.jenzeer) {
			return "فاز البعايت";
		} else if (!hash.villager && !hash.ba3ati && hash.jenzeer) {
			return "فاز أبو جنزير";
		} else if (!hash.villager && !hash.ba3ati && !hash.jenzeer) {
			return "مات الجميع";
		} else {
			return "no_Win";
		}
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

		const getPlayers = inGamePlayers(joinedPlayers);
		if (getPlayers) {
			const hashmap = getPlayers.reduce((acc, val) => {
				acc[val] = (acc[val] || 0) + 1;
				return acc;
			}, {});
			// alert(gameState(hashmap));
			const res = gameState(hashmap);
			if (res === "continue") {
				navigation.dispatch(
					StackActions.replace("vote", {
						joinedPlayers,
						roomId: route.params.roomId,
						MyId: myId,
					})
				);
			} else {
				navigation.dispatch(
					StackActions.replace("win", { joinedPlayers, win: res })
				);
			}
			// alert(JSON.stringify(hashmap));
		}
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
