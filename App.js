import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	SafeAreaView,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import First from "./screens/First";
import Login from "./screens/Login";
import LandNavigator from "./screens/routes/LandPageNavigator";
import SignUp from "./screens/SignUp";
import Splash from "./components/Splash";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function App() {
	const [appIsReady, setAppIsReady] = useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Pre-load fonts, make any API calls you need to do here
				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				// await new Promise((resolve) => setTimeout(resolve, 2000));
			} catch (e) {
				console.warn(e);
			} finally {
				// Tell the application to render
				setAppIsReady(true);
			}
		}

		prepare();
	}, []);

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <ExpoStatusBar hidden /> */}
			<ImageBackground
				source={require("./assets/background.png")}
				style={{ flex: 1 }}
			>
				<StatusBar style="light" />
				{/* <View style={styles.container} onLayou={onLayoutRootView}>
			</View> */}
				<Splash />
				{/* <LandNavigator /> */}
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		justifyContent: "center",
	},
});
