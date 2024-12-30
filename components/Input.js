import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import colors from "../colors";

export default function Input(props) {
  return (
    <View style={styles.wrapper}>
      <Text>{props.label}</Text>
      <View style={styles.inputContainer}>
        {props.iconPack && props.icon && (
          <props.iconPack
            name={props.icon}
            size={props?.size || 24}
            color={props?.iconColor || colors.grey}
          />
        )}
        <TextInput
          {...props}
          id={props.id}
          value={props.value}
          style={styles.input}
          onChangeText={props?.onInputChange && props?.onInputChange}
          onBlur={props.formik && props.formik.handleBlur(props.id)}
        />
      </View>
      {props?.formik &&
        props.formik.touched[props.id] &&
        props.formik.errors[props.id] && (
          <Text style={styles.errorText}>{props.formik.errors[props.id]}</Text>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "red",
  },
  wrapper: {
    marginVertical: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: colors.nearlyWhite,
    borderColor: colors.lightGrey,
  },
  input: {
    marginLeft: 5,
    flex: 1,
  },
});
