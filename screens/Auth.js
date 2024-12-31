import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import PageContainer from "../components/PageContainer";
import { useState } from "react";
import colors from "../colors";
import logo from "../assets/images/logo.png";
import SignUp from "../components/Signup";
import SignIn from "../components/Signin";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <PageContainer>
      <ScrollView>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
          <View style={styles.container}>
            <View style={{ alignItems: "center" }}>
              <Image source={logo} style={styles.logo} />
            </View>
            {isSignup ? <SignUp /> : <SignIn />}

            <TouchableOpacity onPress={() => setIsSignup((prev) => !prev)}>
              <Text style={styles.switchAccount}>{`Switch to ${
                isSignup ? "Sign in " : "Sign up"
              }`}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
  },
  switchAccount: {
    textAlign: "center",
    marginTop: 10,
    color: colors.blue,
    fontFamily: "regular",
    letterSpacing: 0.4,
    fontSize: 15,
  },
});

export default Auth;
