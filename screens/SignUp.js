import { StatusBar } from "expo-status-bar";
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

export default function SignUp({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(false);

	const signUp = async () => {
		try {
			if (password !== confirmPassword) {
				alert("كلمة المرور غير متطابقة");
				return;
			}
			setDisabled(true);
			const { data } = await server.post("/register", {
				name,
				password,
				email,
			});
			if (data) {
				navigation.navigate("login");
			}
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
					placeholder="الاسم"
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setName(email)}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="البريد الإلكتروني"
					placeholderTextColor="#003f5c"
					onChangeText={(email) => setEmail(email)}
				/>
			</View>

			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="كلمة المرور"
					placeholderTextColor="#003f5c"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
			</View>
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="تأكيد كلمة المرور"
					placeholderTextColor="#003f5c"
					secureTextEntry={true}
					onChangeText={(password) => setConfirmPassword(password)}
				/>
			</View>

			<TouchableOpacity
				style={disabled ? styles.disabledloginBtn : styles.loginBtn}
				disabled={disabled}
				onPress={signUp}
			>
				<Text style={styles.loginText}>تسجيل مستخدم جديد</Text>
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
		// fontFamily: "a-massir-ballpoint",
	},

	TextInput: {
		// direction: "rtl",
		height: 50,
		// flex: 1,
		padding: 10,
		// width: 230,
		// marginLeft: 20,
		// justifyContent: "center",
		// alignItems: "center",
		color: "#ffffff",
		// fontFamily: "a-massir-ballpoint",
		// right: 10,
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
