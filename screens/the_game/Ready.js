import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Timer from "../../components/Timer";

import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	FlatList,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";
import { useInterval } from "../../common";
import { StackActions } from "@react-navigation/native";

export default function Host({ route, navigation }) {
	const [isConnected, setIsConnected] = useState(null);
	const [lastPong, setLastPong] = useState(true);
	const [roomId, setRoomId] = useState(route.params.roomId);
	const [joinedPlayers, setJoinedPlayers] = useState([]);
	const [itemData, setItemData] = useState([]);
	const [ready, setReady] = useState(true);
	const [stop, setStop] = useState(true);

	// useEffect(() => {
	// 	const unsubscribe = navigation.addListener("beforeRemove", (e) => {
	// 		e.preventDefault();
	// 		// if (!nav) navigation.dispatch(e.data.action);
	// 	});
	// 	return unsubscribe;
	// }, [navigation]);

	useEffect(() => {
		setReady(true);
	}, []);

	const handleTimeOut = () => {
		setStop(false);
		setReady(false);
	};

	useEffect(() => {
		const allEqual = (arr) => arr.every((v) => v.isReady === true);
		const r = allEqual(joinedPlayers);
		if (stop) setReady(true);
		if (r) {
			setReady(false);
		}
	}, [joinedPlayers]);

	const assignRoles = async () => {
		const game = await server.post("/game/assign", {
			gameId: route.params.roomId,
		});
		navigation.dispatch(
			StackActions.replace("victims", { joinedPlayers, roomId })
		);
	};

	const getGame = async () => {
		const { data } = await server
			.get(`/game/${roomId}`)
			.catch((e) => console.log(e));
		setJoinedPlayers(data.players);
		// console.log(data.players);
		if (data) setLastPong(false);
	};
	useInterval(() => getGame(), 6000);

	const Item = ({ item }) => {
		return (
			<View style={styles.item}>
				<JoinedPlayer name={item.playerName} />
				{item.isReady && <View style={styles.check}></View>}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			{/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}
			<Spinner visible={lastPong} textContent={"Loading..."} />
			<StatusBar style="auto" />
			<View>
				<View style={styles.rect}>
					<View style={styles.loremIpsum2Row}>
						<Text style={styles.text}>انتظر بقية اللاعبين</Text>
					</View>
				</View>
				<View style={styles.scrollArea}>
					<View style={styles.scrollArea_contentContainerStyle}>
						<FlatList
							data={joinedPlayers}
							numColumns={4}
							renderItem={Item}
						/>
					</View>
				</View>
				<Timer timestamp={60} timerCallback={handleTimeOut} />
			</View>

			<TouchableOpacity
				style={ready ? styles.disabledloginBtn : styles.loginBtn}
				onPress={() => assignRoles()}
				disabled={ready}
			>
				<Text style={styles.loginText}>جاهز</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},

	image: {
		marginBottom: 40,
	},

	text: {
		paddingTop: 10,
		height: 40,
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
		fontSize: 20,
	},
	check: {
		position: "absolute",
		height: "9%",
		width: "20%",
		backgroundColor: "green",
		bottom: 50,
		borderRadius: 50,
		right: 20,
		alignSelf: "flex-end",
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
	rect: {
		width: 269,
		height: 95,
		backgroundColor: "#7b8cf7",
		borderRadius: 15,
		flexDirection: "row",
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		// marginLeft: 53,
	},
	loremIpsum2Row: {
		height: 17,
		flexDirection: "column",
		flex: 1,
		marginRight: 15,
		// marginLeft: 64,
		// marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	scrollArea: {
		width: "80%",
		height: 319,
		backgroundColor: "#7b8cf7",
		borderRadius: 22,
		marginTop: 40,
		// marginLeft: 53,
	},
	scrollArea_contentContainerStyle: {
		// height: 319,
		width: 269,
		// flexDirection: "row",
		overflow: "visible",
		flex: 3,
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		padding: 10,
		// backgroundColor: "rgba(249, 180, 45, 0.25)",
		// borderWidth: 1.5,
		// borderColor: "#fff",
	},
	disabledloginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#6b6b6b",
		bottom: 20,
	},
});
