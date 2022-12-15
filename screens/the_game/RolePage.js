import {
	View,
	StyleSheet,
	ScrollView,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native";
import JoinedPlayer from "../../components/JoinedPlayer";

const GamePage = () => {
	const itemData = [
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
		<JoinedPlayer />,
	];

	const Item = ({ item }) => {
		return <View style={Styles.item}>{item}</View>;
	};

	return (
		<View style={Styles.container}>
			<View style={Styles.viewArea}>
				<View style={Styles.head}>
					<View style={Styles.rolePic}></View>
					<Text>Role Name</Text>
				</View>
				<View>
					<View style={Styles.scrollArea}>
						<View style={Styles.scrollArea_contentContainerStyle}>
							<FlatList
								data={itemData}
								numColumns={4}
								renderItem={Item}
							/>
						</View>
					</View>
				</View>
				<View>
					<TouchableOpacity style={Styles.loginBtn}>
						<Text style={Styles.loginText}>Do something</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		backgroundColor: "#fffff",
		alignItems: "center",
	},
	rolePic: {
		backgroundColor: "#945151",
		borderRadius: 100,
		width: 200,
		height: 200,
		margin: 10,
	},
	head: {
		alignItems: "center",
	},
	scrollArea: {
		width: "100%",
		height: 319,
		backgroundColor: "rgba(179,237,171,1)",
		borderRadius: 22,
		marginTop: 40,
		// marginLeft: 53,
	},
	scrollArea_contentContainerStyle: {
		// height: 319,
		width: 290,
		// flexDirection: "row",
		overflow: "visible",
		flex: 3,
	},
	item: {
		flex: 1,
		maxWidth: "25%", // 100% devided by the number of rows you want
		alignItems: "center",

		// my visual styles; not important for the grid
		padding: 10,
		// backgroundColor: "rgba(249, 180, 45, 0.25)",
		// borderWidth: 1.5,
		// borderColor: "#fff",
	},
	loginBtn: {
		width: 200,
		borderRadius: 25,
		height: 50,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 40,
		backgroundColor: "#0f9c79",
		bottom: 20,
	},
	loginText: {
		color: "#fff",
	},
	viewArea: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GamePage;
