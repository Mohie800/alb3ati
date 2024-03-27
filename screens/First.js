import { Icon } from "@rneui/themed";
import {
	Button,
	View,
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	ImageBackground,
} from "react-native";

const First = ({ navigation }) => {
	return (
		<ImageBackground
			source={require("../assets/background.png")}
			style={{ flex: 1, width: null, height: null }}
		>
			<View style={styles.container}>
				<View style={styles.box}>
					<View style={styles.btn}>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => navigation.navigate("gest")}
						>
							<Icon
								name="user"
								color="#1b1b1b"
								// Component={UserOutlined}
								type="antdesign"
							/>
							<Text style={styles.loginText}>ضيف</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.btn}>
						<TouchableOpacity
							style={styles.loginBtn}
							onPress={() => navigation.navigate("login")}
						>
							<Icon
								name="login"
								color="#1b1b1b"
								// Component={UserOutlined}
								type="antdesign"
							/>
							<Text style={styles.loginText}>تسجيل دخول</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.btn}>
						<TouchableOpacity
							style={styles.loginBtn1}
							onPress={() => navigation.navigate("signup")}
						>
							<Icon
								name="adduser"
								color="#ffffff"
								// Component={UserOutlined}
								type="antdesign"
							/>
							<Text style={styles.loginText1}>
								تسجيل مستخدم جديد
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundImage: require("../assets/background.png"),
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
		backgroundColor: "#e0e0e0",
		fontFamily: "a-massir-ballpoint",
		flexDirection: "row",
	},
	loginBtn1: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#1f40a0",
		fontFamily: "a-massir-ballpoint",
		flexDirection: "row",
	},
	loginText: {
		color: "#1b1b1b",
		fontFamily: "a-massir-ballpoint",
	},
	loginText1: {
		color: "#ffffff",
		fontFamily: "a-massir-ballpoint",
	},
	box: {
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
	},
});

export default First;
