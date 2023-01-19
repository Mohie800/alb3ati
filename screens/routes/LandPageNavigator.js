import { NavigationContainer } from "@react-navigation/native";
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

const Stack = createNativeStackNavigator();

const LandNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="welcome">
				<Stack.Screen name="welcome" component={First} />
				<Stack.Screen name="login" component={Login} />
				<Stack.Screen name="signup" component={SignUp} />
				<Stack.Screen name="home" component={Home} />
				<Stack.Screen name="host" component={Host} />
				<Stack.Screen name="game" component={GamePage} />
				<Stack.Screen name="lobby" component={Looby} />
				<Stack.Screen name="customRoles" component={CustomRoles} />
				<Stack.Screen
					name="ready"
					component={Ready}
					options={{
						title: "انتظار",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="victims"
					component={Victims}
					options={{
						title: "",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="vote"
					component={Vote}
					options={{
						title: "التصويت",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="votesready"
					component={VotesReady}
					options={{
						title: "انتظار",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen name="victim" component={VotesVictim} />
				<Stack.Screen
					name="viewrole"
					component={ViewRole}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="new"
					component={NewNight}
					options={{
						title: "ليلة جديدة",
						headerBackVisible: false,
						headerLeft: () => null,
					}}
				/>
				<Stack.Screen
					name="out"
					component={OutOfTheGame}
					options={{
						title: "",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="win"
					component={VillagersWins}
					options={{
						title: "",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="role1"
					component={role1}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="role2"
					component={role2}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="role3"
					component={role3}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="role4"
					component={role4}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
				<Stack.Screen
					name="role5"
					component={role5}
					options={{
						title: "دور اللاعب",
						headerBackVisible: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default LandNavigator;
