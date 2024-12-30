import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./navigation/AppNavigator";

// Prevent the splash screen from auto-hiding
//SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load fonts or other assets
        await Font.loadAsync({
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          black: require("./assets/fonts/Roboto-Bold.ttf"),
        });
      } catch (error) {
        console.error("Error loading fonts:", error);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen once the app is ready
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    // Ensure the app doesn't render until everything is ready
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
