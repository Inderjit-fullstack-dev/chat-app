import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import colors from "../colors";

const SubmitButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={props?.onButtonClicked}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    marginVertical: 5,
  },
  button: {
    backgroundColor: colors.background,
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SubmitButton;
