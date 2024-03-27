import { StyleSheet, View, Text, Image } from "react-native";

function JoinedPlayer(props) {
	return (
		<View style={styles.all}>
			<View style={props.vic ? vic.container : styles.container}>
				<Image
					style={props.vic ? vic.container : styles.container}
					source={require("../assets/profile.png")}
				/>
			</View>
			<View style={styles.textCont}>
				<Text style={props.vic ? vic.text : styles.text}>
					{props.name}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "#E6E6E6",
		borderRadius: 100,
		width: 43,
		height: 41,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	textCont: {
		alignItems: "center",
		// justifyContent: "center",
	},
	text: {
		fontSize: 9,
		color: "#fff",
	},
	all: {
		margin: 10,
	},
});

const vic = StyleSheet.create({
	container: {
		// backgroundColor: "#E6E6E6",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	textCont: {
		alignItems: "center",
		// justifyContent: "center",
	},
	text: {
		fontSize: 20,
		color: "#e0e0e0",
	},
	all: {
		margin: 10,
	},
});

export default JoinedPlayer;
