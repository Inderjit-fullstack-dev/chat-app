import React, { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../assets/images/background.jpeg";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "../colors";
const Chat = () => {
  const [message, setMessage] = useState("");
  const handleInputChange = (text) => {
    setMessage(text);
  };
  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          source={background}
          style={styles.backgroundContainer}
        ></ImageBackground>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => console.log("image clicked")}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            onChangeText={handleInputChange}
          />

          {message == "" ? (
            <TouchableOpacity onPress={() => console.log("camera clicked")}>
              <Ionicons name="camera" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => console.log("send clicked")}>
              <Ionicons name="send-sharp" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundContainer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 7,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  textInput: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    flex: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 35,
  },
});

export default Chat;
