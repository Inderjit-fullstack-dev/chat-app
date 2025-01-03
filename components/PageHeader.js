import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PageHeader = ({ children }) => {
  return (
    <View>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "black",
    fontSize: 27,
  },
});

export default PageHeader;
