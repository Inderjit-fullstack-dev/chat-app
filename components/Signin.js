import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./Button";
import Input from "./Input";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SignIn = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
      />

      <SubmitButton label="Login" onButtonClicked={formik.handleSubmit} />
    </View>
  );
};

export default SignIn;
