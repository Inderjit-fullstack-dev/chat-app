import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import Auth from "../screens/Auth";

import { useDispatch, useSelector } from "react-redux";
import StartupScreen from "../screens/StartupScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.user != null);
  const authState = useSelector((state) => state.auth);
  const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);
  // console.log("isLoggedIn", isLoggedIn);
  // console.log("authState", authState);
  // AsyncStorage.clear();
  // useEffect(() => {
  //   const tempLogout = async () => {
  //     dispatch(clearUser());
  //     await AsyncStorage.clear();
  //   };
  //   tempLogout();
  // }, []);

  return (
    <NavigationContainer>
      {isLoggedIn && <MainNavigator />}
      {!isLoggedIn && didTryAutoLogin && <Auth />}
      {!isLoggedIn && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
}
