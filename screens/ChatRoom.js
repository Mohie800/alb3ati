import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView,
	Button,
	TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import useStore from "../store/store";
import { StackActions } from "@react-navigation/native";
import Timer from "../components/Timer";

const ChatRoom = ({ route, navigation }) => {
	// const [roomId, setRoomId] = useState(route.params.roomId);
	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState(null);
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState("");

	const ref = useRef(null);

	const user = useStore((state) => state.user);
	const roomId = useStore((state) => state.roomId);
	const socket = io("http://192.168.43.52:3000", {
		autoConnect: true,
	});
	// const socket = io("https://alba3ati-chat.onrender.com", {
	// 	autoConnect: true,
	// });

	useEffect(() => {
		socket.on("connect", () => {
			socket.emit("join-room", roomId, userId);
		});
	}, []);

	useEffect(() => {
		socket.on("user-connected", (userId, room) => {
			console.log(`User connected: ${userId} to room ${room}`);
		});

		socket.on("user-disconnected", (userId) => {
			console.log(`User disconnected: ${userId}`);
		});

		//
		socket.on("message-received", (message1, senderId, userName) => {
			setMessages((prevMessages) => [
				...prevMessages,
				{ message1, senderId, userName },
			]);
			ref.current.scrollToEnd({ animated: true });
		});
	}, [socket]);

	useEffect(() => {}, [socket]);

	useEffect(() => {
		setUserId(user.userId);
		setUserName(user.userName);
		// alert(JSON.stringify(user));
	}, []);

	const sendMessage = () => {
		socket.emit("send-message", roomId, message, userId, userName);
		setTimeout(() => setMessage(""), 200);
	};

	const handleNext = () => {
		navigation.dispatch(
			StackActions.replace("vote", {
				joinedPlayers: route.params.joinedPlayers,
				roomId: route.params.roomId,
				MyId: route.params.MyId,
				nightNum: route.params.nightNum,
			})
		);
	};

	const renderMessages = () => {
		return messages.map((m, index) => {
			return (
				<Text key={index} style={styles.message}>
					<Text style={styles.messageSender}>{m.userName}: </Text>
					{m.message1}
				</Text>
			);
		});
	};

	return (
		<View style={styles.container}>
			<Timer
				timestamp={60}
				containerStyle={{
					backgroundColor: "#e0e0e0",
					padding: 10,
					marginBottom: 10,
					width: "80%",
					borderRadius: 20,
					alignItems: "center",
				}}
				textStyle={{ fontSize: 20 }}
				// timerCallback={handleNext}
			/>
			<View style={styles.box}>
				<ScrollView ref={ref} style={styles.messagesContainer}>
					{renderMessages()}
				</ScrollView>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						value={message}
						onChangeText={(text) => setMessage(text)}
					/>
					<Button title="Send" onPress={sendMessage} />
				</View>
			</View>
			<View>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => handleNext()}
				>
					<Text style={styles.loginText}>التصويت</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChatRoom;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	messagesContainer: {
		flex: 1,

		// backgroundColor: "#1f1f1f",
		height: "100%",
	},
	message: {
		fontSize: 16,
		padding: 10,
		// backgroundColor: "#1f1f1f",
		// height: 20,
		// top: 10,
	},
	messageSender: {
		fontWeight: "bold",
	},
	inputContainer: {
		height: 60,
		flexDirection: "row",
		backgroundColor: "#eee",
		alignItems: "center",
		padding: 10,
		// borderBottomRightRadius: 20,
		borderRadius: 20,
		marginBottom: 10,
		marginHorizontal: 5,
	},
	input: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10,
	},
	box: {
		width: "80%",
		height: "60%",
		backgroundColor: "#e0e0e0",
		borderRadius: 20,
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
