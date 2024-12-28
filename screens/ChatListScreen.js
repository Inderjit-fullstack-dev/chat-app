import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatListScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <Button
        title="Go to the chat"
        onPress={() => navigation.navigate("Chat")}
      />
    </SafeAreaView>
  );
};

export default ChatListScreen;
