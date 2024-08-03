import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="bg-primary h-full">
        <Text className="text-2xl text-white font-psemibold">Bookmark</Text>
      </SafeAreaView>
    </GestureHandlerRootView>

  );
};

export default Bookmark;