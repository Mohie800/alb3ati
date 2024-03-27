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
import { Icon } from "@rneui/themed";
import server from "../api/server";

export default function SignUp({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [disabled, setDisabled] = useState(false);

	const signUp = async () => {
		try {
			const json = { email: email.toLowerCase().trim(), password, name };
			if (password !== confirmPassword) {
				alert("كلمة المرور غير متطابقة");
				return;
			}
			setDisabled(true);
			const { data } = await server.post("/register", json);
			if (data) {
				navigation.navigate("login");
			}
		} catch (e) {
			setDisabled(false);
			alert("حاول مرةاخرى");
		}
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../assets/adapt1.png")}
			/>
			<StatusBar style="auto" />
			<View style={styles.box}>
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
						onChangeText={(password) =>
							setConfirmPassword(password)
						}
					/>
				</View>

				<TouchableOpacity
					style={disabled ? styles.disabledloginBtn : styles.loginBtn}
					disabled={disabled}
					onPress={signUp}
				>
					<Icon name="adduser" color="#fff" type="antdesign" />
					<Text style={styles.loginText}>تسجيل مستخدم جديد</Text>
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

	inputView: {
		display: "flex",
		backgroundColor: "#e0e0e0",
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
		height: 50,
		padding: 10,
		color: "#1b1b1b",
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
		flexDirection: "row",
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
		flexDirection: "row",
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
