import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { StackActions } from "@react-navigation/native";

const Home = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.btn}>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => navigation.navigate("host")}
				>
					<Text style={styles.loginText}>استضف لعبة</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.btn}>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => navigation.navigate("lobby")}
				>
					<Text style={styles.loginText}>الانضمام للعبة</Text>
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
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
});

export default Home;
