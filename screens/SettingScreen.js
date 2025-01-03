import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colors from "../colors";
import SubmitButton from "../components/Button";
import Input from "../components/Input";
import PageContainer from "../components/PageContainer";
import PageHeader from "../components/PageHeader";
import * as Yup from "yup";
import ProfileImagePicker from "../components/ProfileImagePicker";

function SettingScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.user);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    bio: Yup.string().nullable().min(10).max(500),
  });
  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      bio: userData.bio,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
      } catch (error) {
        Alert.alert(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <PageContainer>
      <PageHeader>Settings</PageHeader>

      {/* user edit form */}
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <ProfileImagePicker />
        </View>

        <Input
          label="Firstname"
          id="firstName"
          iconPack={Ionicons}
          icon="person"
          onInputChange={formik.handleChange("firstName")}
          formik={formik}
          value={formik.values.firstName}
          readonly="true"
        />

        <Input
          label="Lastname"
          id="lastName"
          iconPack={Ionicons}
          icon="person"
          onInputChange={formik.handleChange("lastName")}
          formik={formik}
          value={formik.values.lastName}
        />
        <Input
          label="Email"
          id="email"
          iconPack={Ionicons}
          icon="mail"
          keyboardType="email-address"
          autoCapitalize="none"
          formik={formik}
          value={formik.values.email}
          editable={false}
        />
        <Input
          label="Bio"
          id="bio"
          iconPack={Ionicons}
          icon="person"
          onInputChange={formik.handleChange("bio")}
          autoCapitalize="none"
          formik={formik}
          value={formik.values.bio}
          multiline={true}
          numberOfLines={4}
        />
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            style={{ marginVertical: 5 }}
            color={colors.background}
          />
        ) : (
          <SubmitButton label="Save" onButtonClicked={formik.handleSubmit} />
        )}
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginVertical: 10,
  },
});

export default SettingScreen;
