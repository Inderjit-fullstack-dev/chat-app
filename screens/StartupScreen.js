import React, { useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import colors from "../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setDidTryAutoLogin, setUser } from "../store/slices/userSlice";
const StartupScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkToken = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser?.token) {
          try {
            const token = parsedUser.token;
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
              dispatch(setUser(parsedUser));
            }
          } catch {
            dispatch(setDidTryAutoLogin());
          }
        }
      } else {
        dispatch(setDidTryAutoLogin());
      }
    };
    checkToken();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={colors.background} />
    </View>
  );
};

export default StartupScreen;
