import PressableOne from "@/components/Presseable/PressableOne";
import PressableThree from "@/components/Presseable/PressableThree";
import PressableTwo from "@/components/Presseable/PressableTwo";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top,bottom } = useSafeAreaInsets()
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: top,
        paddingBottom: bottom,
      }}
      contentContainerStyle={{ alignItems: "center", gap: 10,}}
    >
      <PressableOne />
      <PressableTwo />
      <PressableThree />
    </ScrollView>
  );
}
