import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import server from "../../api/server";
import JoinedPlayer from "../../components/JoinedPlayer";
import * as SecureStore from "expo-secure-store";
import { StackActions } from "@react-navigation/native";

const VotesVictim = ({ route, navigation }) => {
	const [votes, setvotes] = useState(null);
	const [victim, setvictim] = useState();
	const [joinedPlayers, setJoinedPlayers] = useState(null);
	const [alivePlayers, setAlivePlayers] = useState(null);
	const [player, setPlayer] = useState(null);

	const getGame = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server
			.get(`/game/${route.params.roomId}`)
			.catch((e) => console.log(e));
		setvotes(data.votes);
		setJoinedPlayers(data.players);
		const findMe = findPlayer(data.players, myId);
		setPlayer(findMe[0]);
	};

	const findPlayer = (arr, myId) => {
		return arr.filter((player) => {
			return player.playerId === myId;
		});
	};

	const calVotes = (arr) => {
		const hashmap = arr.reduce((acc, val) => {
			acc[val] = (acc[val] || 0) + 1;
			return acc;
		}, {});
		return Object.keys(hashmap).filter((x) => {
			return hashmap[x] == Math.max.apply(null, Object.values(hashmap));
		});
	};

	const fuck = async (playerId) => {
		const { data } = await server.post("/game/outofthegame", {
			gameId: route.params.roomId,
			playerId: playerId,
		});
	};

	useEffect(() => {
		getGame();
	}, []);

	useEffect(() => {
		if (votes) {
			const victim = calVotes(votes);
			if (victim.length == 1) {
				setvictim(victim);
				fuck(victim[0]);
			}
		}
	}, [votes]);

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
			return "فاز البعاعيت";
		} else if (!hash.villager && !hash.ba3ati && hash.jenzeer) {
			return "فاز أبو جنزير";
		} else if (!hash.villager && !hash.ba3ati && !hash.jenzeer) {
			return "مات الجميع";
		} else {
			return "no_Win";
		}
	};

	const gameResult = async () => {
		const myId = await SecureStore.getItemAsync("id");
		const { data } = await server
			.get(`/game/${route.params.roomId}`)
			.catch((e) => console.log(e));
		const getPlayers = inGamePlayers(data.players);
		if (getPlayers) {
			const hashmap = getPlayers.reduce((acc, val) => {
				acc[val] = (acc[val] || 0) + 1;
				return acc;
			}, {});
			const res = gameState(hashmap);
			if (res === "continue") {
				await server.post("/game/notvoted", {
					gameId: route.params.roomId,
					myId,
				});
				navigation.dispatch(
					StackActions.replace("new", {
						player: player,
						roomId: route.params.roomId,
						nightNum: Number(route.params.nightNum) + 1,
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

	const renderVictims = () => {
		return joinedPlayers.map((player) => {
			if (player.playerId == victim) {
				return (
					<View key={player.playerId} style={styles.player}>
						<JoinedPlayer name={player.playerName} vic={1} />
					</View>
				);
			}
		});
	};

	const renderVotesEqual = () => {
		return (
			<View>
				<Text style={styles.text}>تعادلت الأصوات</Text>
			</View>
		);
	};

	return (
		<View>
			<View style={styles.container}>
				<View style={styles.box}>
					<View>
						{victim && (
							<Text style={styles.text}>قامت القرية بقتل :</Text>
						)}
					</View>
					<View>{victim ? renderVictims() : renderVotesEqual()}</View>
					<View>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => gameResult()}
						>
							<Text style={styles.loginText}>التالي</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
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
		color: "#e0e0e0",
	},
	player: {
		width: "50%",
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
		backgroundColor: "#1f1f1f",
		opacity: 0.9,
		borderRadius: 20,
		padding: 20,
	},
});

export default VotesVictim;
