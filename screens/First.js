import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";

const First = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.btn}>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => navigation.navigate("login")}
				>
					<Text style={styles.loginText}>تسجيل دخول</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.btn}>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => navigation.navigate("signup")}
				>
					<Text style={styles.loginText}>تسجيل مستخدم جديد</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	btn: {
		margin: 10,
	},
	loginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f30a0",
		fontFamily: "a-massir-ballpoint",
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
});

export default First;
