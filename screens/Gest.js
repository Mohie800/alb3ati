import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import useStore from "../store/store";

export default function Gest({ navigation }) {
	const [name, setName] = useState("");
	const [playerId, setPlayerId] = useState(
		Math.random().toString(36).substr(2, 20)
	);
	const [disabled, setDisabled] = useState(false);

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const isUser = useStore((state) => state.isUser);
	const setUserObj = useStore((state) => state.setUserObj);
	// aler/t(JSON.stringify(isUser));

	const handleLogin = async () => {
		setDisabled(true);
		saveToken("name", name);
		saveToken("id", playerId);
		setUserObj({ userName: name, userId: playerId });
		if (name) {
			setDisabled(false);
			navigation.navigate("home", { isUser: false });
		} else {
			setDisabled(false);
			alert("اكتب الاسم");
		}
	};

	return (
		<View style={styles.container}>
			<View>
				<Image
					style={styles.image}
					source={require("../assets/adapt1.png")}
				/>
			</View>
			<View style={styles.box}>
				<StatusBar style="auto" />
				<View style={styles.inputView}>
					<TextInput
						style={styles.TextInput}
						placeholder="الاسم"
						placeholderTextColor="#1b1b1b"
						onChangeText={(name) => setName(name)}
					/>
				</View>

				<TouchableOpacity
					style={disabled ? styles.disabledloginBtn : styles.loginBtn}
					disabled={disabled}
					onPress={handleLogin}
				>
					<Text style={styles.loginText}>تسجيل دخول</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		width: 100,
		height: 100,
		marginBottom: 40,
		borderRadius: 25,
	},

	imgCont: {
		backgroundColor: "#e0e0e0",
		marginBottom: 10,
		borderRadius: 10,
		height: 100,
		width: 120,
		alignItems: "center",
		// justifyContent: "center",
	},

	inputView: {
		display: "flex",
		backgroundColor: "#e0e0e0",
		borderRadius: 10,
		width: 250,
		height: 45,
		marginBottom: 20,
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "a-massir-ballpoint",
	},

	TextInput: {
		height: 50,
		// flex: 1,
		// width: 210,
		width: "100%",
		textAlign: "center",

		// marginLeft: 20,
		justifyContent: "center",
		alignItems: "center",
		color: "#1b1b1b",
		// fontFamily: "a-massir-ballpoint",
	},

	forgot_button: {
		height: 30,
		marginBottom: 30,
	},

	loginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f30a0",
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	disabledloginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#6b6b6b",
		// bottom: 20,
	},
	box: {
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
	},
});
