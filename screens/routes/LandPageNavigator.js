import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import First from "../First";
import Home from "../Home";
import Login from "../Login";
import SignUp from "../SignUp";
import Host from "../HostGame";
import GamePage from "../the_game/RolePage";
import Looby from "../the_game/Looby";
import role1 from "../the_game/1";
import role2 from "../the_game/2";
import role3 from "../the_game/3";
import role4 from "../the_game/4";
import role5 from "../the_game/5";
import Ready from "../the_game/Ready";
import Victims from "../the_game/Victims";
import Vote from "../the_game/Vote";
import VotesVictim from "../the_game/VotesVictim";
import ViewRole from "../the_game/ViewRole";
import VotesReady from "../the_game/VotesReady";
import NewNight from "../the_game/NewNight";
import OutOfTheGame from "../the_game/OutOfTheGame";
import VillagersWins from "../the_game/VillagersWins";
import CustomRoles from "../the_game/customRoles/CustomRoles";
import Friends from "../friends/Friends";
import Gest from "../Gest";
import ChatRoom from "../ChatRoom";
import ViewGame from "../the_game/ViewGame";

const Stack = createNativeStackNavigator();

const navTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "transparent",
	},
};

const LandNavigator = () => {
	return (
		<NavigationContainer theme={navTheme}>
			<Stack.Navigator initialRouteName="welcome">
				<Stack.Screen
					name="welcome"
					component={First}
					options={{
						title: "",
						headerBackVisible: false,
						headerTransparent: true,
					}}
				/>
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen
					name="gest"
					component={Gest}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
					}}
				/>
				<Stack.Screen name="signup" component={SignUp} />
				<Stack.Screen
					name="home"
					component={Home}
					options={{
						title: "",
						// headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="friends"
					component={Friends}
					options={{
						title: "",
						// headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="host"
					component={Host}
					options={{
						title: "",
						// headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen name="game" component={GamePage} />
				<Stack.Screen
					name="lobby"
					component={Looby}
					options={{
						title: "",
						// headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="customRoles"
					component={CustomRoles}
					options={{
						title: "",
						// headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="ready"
					component={Ready}
					options={{
						title: "",
						headerBackVisible: false,
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name="chat"
					component={ChatRoom}
					options={{
						title: "",
						headerBackVisible: false,
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name="victims"
					component={Victims}
					options={{
						title: "",
						headerBackVisible: false,
						headerTransparent: true,
					}}
				/>
				<Stack.Screen
					name="vote"
					component={Vote}
					options={{
						title: "التصويت",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="votesready"
					component={VotesReady}
					options={{
						title: "انتظار",
						headerBackVisible: false,
						// headerTransparent: true,
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
					}}
				/>
				<Stack.Screen
					name="victim"
					component={VotesVictim}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="viewrole"
					component={ViewRole}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="new"
					component={NewNight}
					options={{
						title: "ليلة جديدة",
						headerBackVisible: false,
						headerLeft: () => null,

						headerTransparent: true,
						animation: "fade",
						animationDuration: 1000,
					}}
				/>
				<Stack.Screen
					name="out"
					component={OutOfTheGame}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="win"
					component={VillagersWins}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="viewgame"
					component={ViewGame}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="role1"
					component={role1}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="role2"
					component={role2}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="role3"
					component={role3}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="role4"
					component={role4}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
				<Stack.Screen
					name="role5"
					component={role5}
					options={{
						title: "",
						headerBackVisible: false,
						// headerTransparent: true,
						headerStyle: {
							backgroundColor: "#fa5c5c00",
							color: "#e0e0e0",
						},
						headerShadowVisible: false,
						headerTintColor: "#e0e0e0",
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default LandNavigator;
