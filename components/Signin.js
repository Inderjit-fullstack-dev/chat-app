import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./Button";
import Input from "./Input";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { login } from "../cores/services/user.service";

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
    onSubmit: async (values) => {
      const result = await login(values);
      console.log(result);
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
