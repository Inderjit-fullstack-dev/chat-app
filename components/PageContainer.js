import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../colors";

const PageContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "10",
    paddingVertical: "10",
    backgroundColor: colors.white,
  },
});

export default PageContainer;
