import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import Auth from "../screens/Auth";

export default function AppNavigator() {
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      {isLoggedIn && <MainNavigator />}
      {!isLoggedIn && <Auth />}
    </NavigationContainer>
  );
}
