import { StatusBar } from "expo-status-bar";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	TouchableOpacity,
} from "react-native";

import server from "../api/server";

export default function Login({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);

	const saveToken = async (key, value) => {
		await SecureStore.setItemAsync(key, value);
	};

	const handleLogin = async () => {
		const json = { email: email.toLowerCase().trim(), password };

		try {
			setDisabled(true);
			const { data } = await server.post("/login", json);
			saveToken("token", data.token);
			saveToken("name", data.name);
			saveToken("id", data.id);
			if (data.token) {
				setDisabled(false);
				navigation.navigate("home");
			}
			// alert(JSON.stringify(data));
		} catch (e) {
			setDisabled(false);
			alert("حاول مرةاخرى");
			// alert(e);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../assets/adapt.png")}
			/>

			<StatusBar style="auto" />
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="البريد الإلكتروني"
					placeholderTextColor="#ffffff"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="كلمة المرور"
					placeholderTextColor="#ffffff"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>

			<TouchableOpacity>
				<Text style={styles.forgot_button}>Forgot Password?</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={disabled ? styles.disabledloginBtn : styles.loginBtn}
				disabled={disabled}
				onPress={handleLogin}
			>
				<Text style={styles.loginText}>تسجيل دخول</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},

	image: {
		width: 100,
		height: 100,
		marginBottom: 40,
		borderRadius: 25,
	},

	inputView: {
		display: "flex",
		backgroundColor: "#7b8cf7",
		borderRadius: 30,
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

		// marginLeft: 20,
		justifyContent: "center",
		alignItems: "center",
		color: "#fff",
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
});
