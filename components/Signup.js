import { useFormik } from "formik";
import * as Yup from "yup";
import SubmitButton from "./Button";
import Input from "./Input";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const SignUp = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
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
        label="Firstname"
        id="firstName"
        iconPack={Ionicons}
        icon="person"
        onInputChange={formik.handleChange("firstName")}
        formik={formik}
      />

      <Input
        label="Lastname"
        id="lastName"
        iconPack={Ionicons}
        icon="person"
        onInputChange={formik.handleChange("lastName")}
        formik={formik}
      />
      <Input
        label="Email"
        id="email"
        iconPack={Ionicons}
        icon="mail"
        onInputChange={formik.handleChange("email")}
        keyboardType="email-address"
        autoCapitalize="none"
        formik={formik}
      />
      <Input
        label="Password"
        id="password"
        iconPack={Ionicons}
        icon="lock-closed"
        onInputChange={formik.handleChange("password")}
        secureTextEntry={true}
        autoCapitalize="none"
        formik={formik}
      />
      <SubmitButton label="Register" onButtonClicked={formik.handleSubmit} />
    </View>
  );
};

export default SignUp;
