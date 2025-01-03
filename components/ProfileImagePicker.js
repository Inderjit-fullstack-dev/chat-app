import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import ProfileIcon from "./ProfileIcon";
import Ionicons from "@expo/vector-icons/Ionicons";
const ProfileImagePicker = ({ source }) => {
  const handleImagePicker = () => {
    console.log("pic");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePicker}>
        <ProfileIcon source={source} />
        <Ionicons
          name="create"
          size={24}
          color="black"
          style={styles.profileEditIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
  },
  profileEditIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
});

export default ProfileImagePicker;
