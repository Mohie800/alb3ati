import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useEffect } from "react";

const OutOfTheGame = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.text}>أنت ضحية, لايسمح لك بالتحدث</Text>
			</View>
			<View>
				<TouchableOpacity
					onPress={() => navigation.navigate("home")}
					style={styles.loginBtn}
				>
					<Text style={styles.loginText}>خروج</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("viewgame")}
					style={styles.loginBtn}
				>
					<Text style={styles.loginText}>مراقبة اللعبة</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	text: {
		fontSize: 30,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
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

export default OutOfTheGame;
