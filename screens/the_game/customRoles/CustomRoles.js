import { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Switch,
	Image,
} from "react-native";
import server from "../../../api/server";
import { StackActions } from "@react-navigation/native";
import useStore from "../../../store/store";

const CustomRoles = ({ navigation, route }) => {
	const [b3ati, setB3ati] = useState(0);
	const [al3omda, setAl3omda] = useState(0);
	const [damazeen, setDamazeen] = useState(0);
	const [sittalwadi3, setSittalwadi3] = useState(0);
	const [jenzeer, setJenzeer] = useState(0);
	const [total, setTotal] = useState(route.params.joinedPlayers.length);
	const [randomRoles, setRandomRoles] = useState(false);

	const RoomID = useStore((state) => state.roomId);

	const incRoleCount = (getter, setter) => {
		if (total == 0) return;
		setTotal(total - 1);
		setter(Number(getter) + 1);
	};

	const decRoleCount = (getter, setter) => {
		if (Number(getter) == 0) return;
		setTotal(total + 1);
		setter(Number(getter) - 1);
	};

	const constructRole = () => {
		let roles = [];
		if (b3ati != 0) roles.push({ roleId: 1, players: b3ati });
		if (damazeen != 0) roles.push({ roleId: 2, players: damazeen });
		if (al3omda != 0) roles.push({ roleId: 3, players: al3omda });
		if (sittalwadi3 != 0) roles.push({ roleId: 4, players: sittalwadi3 });
		if (jenzeer != 0) roles.push({ roleId: 5, players: jenzeer });
		return roles;
	};

	const constructRandomRoles = () => {
		let roles = [];
		roles.push({ roleId: 1, players: Math.round(total * 0.3) });
		roles.push({ roleId: 2, players: Math.round(total * 0.2) });
		roles.push({ roleId: 3, players: Math.round(total * 0.3) });
		roles.push({ roleId: 4, players: Math.round(total * 0.1) });
		roles.push({ roleId: 5, players: total < 8 ? 0 : 1 });
		const filterRoles = roles.filter((role) => role.players != 0);
		return filterRoles;
	};

	const handleStartGame = async () => {
		// const roles = constructRole();
		const roles = randomRoles ? constructRandomRoles() : constructRole();
		// alert(JSON.stringify(roles));
		const { data } = await server.post("/game/assignmanual", {
			roles,
			gameId: RoomID,
		});
		navigation.dispatch(
			StackActions.replace(`new`, {
				// joinedPlayers,
				roomId: RoomID,
				// MyId: myId,
				// player,
			})
		);
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<View>
					<Text style={styles.headText}>اختر الادوار</Text>
				</View>
				<View>
					<Text style={styles.text}>عشوائي</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={randomRoles ? "#483dee" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={setRandomRoles}
						value={randomRoles}
					/>
				</View>
				<Text style={styles.total}>المتبقي : {total}</Text>
				<View style={randomRoles ? styles.non : styles.non1}>
					<Text style={styles.headText}>القرويون</Text>
					<View style={styles.boxContainer}>
						<View>
							<Image
								style={styles.image}
								source={require("../../../assets/al3omda2.png")}
							/>
						</View>
						<View style={styles.roleListCont}>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() => {
										incRoleCount(al3omda, setAl3omda);
									}}
								>
									<Text style={styles.incText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.roleCont}>
								<Text style={styles.text}>العمدة</Text>
								<Text style={styles.text}>{al3omda}</Text>
							</View>
							<View>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() =>
										decRoleCount(al3omda, setAl3omda)
									}
								>
									<Text style={styles.incText}>-</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.boxContainer}>
						<View>
							<Image
								style={styles.image}
								source={require("../../../assets/damazeen2.png")}
							/>
						</View>
						<View style={styles.roleListCont}>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() => {
										incRoleCount(damazeen, setDamazeen);
									}}
								>
									<Text style={styles.incText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.roleCont}>
								<Text style={styles.text}>شيخ الدمازين</Text>
								<Text style={styles.text}>{damazeen}</Text>
							</View>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() =>
										decRoleCount(damazeen, setDamazeen)
									}
								>
									<Text style={styles.incText}>-</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.boxContainer}>
						<Image
							style={styles.image}
							source={require("../../../assets/eye-sw2.png")}
						/>
						<View style={styles.roleListCont}>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() => {
										incRoleCount(
											sittalwadi3,
											setSittalwadi3
										);
									}}
								>
									<Text style={styles.incText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.roleCont}>
								<Text style={styles.text}>ست الودع</Text>
								<Text style={styles.text}>{sittalwadi3}</Text>
							</View>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() =>
										decRoleCount(
											sittalwadi3,
											setSittalwadi3
										)
									}
								>
									<Text style={styles.incText}>-</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<View style={randomRoles ? styles.non : styles.non1}>
					<Text style={styles.headText}>البعاعيت</Text>
					<View style={styles.boxContainer}>
						<Image
							style={styles.image}
							source={require("../../../assets/adapt1.png")}
						/>
						<View style={styles.roleListCont}>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() => {
										incRoleCount(b3ati, setB3ati);
									}}
								>
									<Text style={styles.incText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.roleCont}>
								<Text style={styles.text}>بعاتي</Text>
								<Text style={styles.text}>{b3ati}</Text>
							</View>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() =>
										decRoleCount(b3ati, setB3ati)
									}
								>
									<Text style={styles.incText}>-</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<View style={randomRoles ? styles.non : styles.non1}>
					<Text style={styles.headText}>أدوار اخرى</Text>
					<View style={styles.boxContainer}>
						<Image
							style={styles.image}
							source={require("../../../assets/jenzeer2.png")}
						/>
						<View style={styles.roleListCont}>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() => {
										incRoleCount(jenzeer, setJenzeer);
									}}
								>
									<Text style={styles.incText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.roleCont}>
								<Text style={styles.text}>ابو جنزير</Text>
								<Text style={styles.text}>{jenzeer}</Text>
							</View>
							<View style={styles.btnCont}>
								<TouchableOpacity
									style={styles.incBtn}
									onPress={() =>
										decRoleCount(jenzeer, setJenzeer)
									}
								>
									<Text style={styles.incText}>-</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => handleStartGame()}
				>
					<Text style={styles.loginText}>ابدأ اللعبة</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",

		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
		margin: 20,
	},
	headText: {
		fontSize: 30,
		padding: 20,
		fontFamily: "a-massir-ballpoint",
		color: "#e0e0e0",
	},
	roleListCont: {
		borderWidth: 5,
		borderColor: "#da9191",
		margin: 10,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	roleCont: {
		alignItems: "center",
	},
	btnCont: {
		// margin: 10
	},
	incBtn: {
		margin: 10,
		backgroundColor: "#483dee",
		width: 25,
		height: 25,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	incText: {
		color: "#ffffff",
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
		color: "#fff",
	},
	loginText: {
		color: "#fff",
		fontFamily: "a-massir-ballpoint",
	},
	non: {
		display: "none",
	},
	box: {
		backgroundColor: "#1b1b1b",
		padding: 20,
		borderRadius: 20,
		borderWidth: 1,
		opacity: 0.9,
	},
	text: {
		color: "#e0e0e0",
	},
	total: {
		color: "#e0e0e0",
	},
	image: {
		height: 200,
		width: 200,
		borderRadius: 50,
		backgroundColor: "#e0e0e0",
	},
	boxContainer: {
		backgroundColor: "#f51f1f94",
		borderRadius: 20,
		padding: 20,
		marginTop: 15,
	},
});

export default CustomRoles;
