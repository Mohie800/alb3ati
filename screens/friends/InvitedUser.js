import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import server from "../../api/server";
import * as SecureStore from "expo-secure-store";

const InvitedUser = ({ invite, invited, userId, nav }) => {
	const handelReject = async () => {
		try {
			await server.post("users/rminvite", { userId });
		} catch (error) {
			console.log(error);
		}
	};

	const handelAccept = async () => {
		try {
			await server.post("users/rminvite", { userId });
			const playerName = await SecureStore.getItemAsync("name");
			await server.post("/game/join", {
				gameId: invite.gameId,
				playerName,
				playerId: userId,
			});
			nav.navigate("lobby", { lastPong: true, gameId: invite.gameId });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={invited ? styles.container : styles.non}>
			<View>
				<Text
					style={styles.text}
				>{`قام اللاعب ${invite.userName} بدعوتك الى اللعبة ${invite.gameId}`}</Text>
			</View>
			<View style={styles.btnCont}>
				<TouchableOpacity style={styles.btn} onPress={handelAccept}>
					<Text style={styles.text}>قبول</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.btn} onPress={handelReject}>
					<Text style={styles.text}>رفض</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default InvitedUser;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 20,
		backgroundColor: "red",
		padding: 20,
		opacity: 0.8,
	},
	non: {
		display: "none",
	},
	text: {
		color: "#e0e0e0",
	},
	btn: {
		backgroundColor: "#1f1f1f",
		padding: 15,
		borderRadius: 50,
	},
	btnCont: {
		top: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
});
