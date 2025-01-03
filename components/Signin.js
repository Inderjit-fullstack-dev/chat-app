import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./Button";
import Input from "./Input";
import { ActivityIndicator, Alert, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login, logout } from "../cores/services/user.service";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setDidTryAutoLogin, setUser } from "../store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const timerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "inderjit@gmail.com",
      password: "123456",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const user = await login(values);
        if (user) {
          setAutoLogoutWhenTokenExpired(user.token);
        }
        setLoading(false);
        dispatch(setUser(user));
        await AsyncStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        setLoading(false);
        Alert.alert(error.message);
      }
    },
  });

  const setAutoLogoutWhenTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken) {
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      const expiryTime = decodedToken.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      const milliseconds = Math.abs(expiryTime - currentTime) * 1000;

      timerRef.current = setTimeout(async () => {
        const result = await logout();
        if (result) {
          dispatch(setUser(null));
          dispatch(setDidTryAutoLogin());
          AsyncStorage.clear();
        }
      }, milliseconds);
    }
  };

  return (
    <View>
      <Input
        label="Email"
        id="email"
        iconPack={Ionicons}
        icon="mail"
        onInputChange={formik.handleChange("email")}
        formik={formik}
        keyboardType="email-address"
        autoCapitalize="none"
        value={formik.values.email}
      />
      <Input
        label="Password"
        id="password"
        iconPack={Ionicons}
        icon="lock-closed"
        onInputChange={formik.handleChange("password")}
        formik={formik}
        secureTextEntry={true}
        autoCapitalize="none"
        value={formik.values.password}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <SubmitButton label="Login" onButtonClicked={formik.handleSubmit} />
      )}
    </View>
  );
};

export default SignIn;
