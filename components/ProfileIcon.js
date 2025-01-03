import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import profileIcon from "../assets/images/profile.png";
import colors from "../colors";
const ProfileIcon = (props) => {
  return (
    <View>
      <Image
        style={{
          ...styles.profileIcon,
          width: props.width || 100,
          height: props.height || 100,
        }}
        {...props}
        source={props.source ?? profileIcon}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  profileIcon: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    padding: 3,
    resizeMode: "cover",
  },
});
export default ProfileIcon;
