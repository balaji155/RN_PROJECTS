import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MovieDateAndTimings from "@/components/MovieDateAndTimings";
import Tickets from "@/components/Tickets";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const { top,bottom } = useSafeAreaInsets()
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: top,
        paddingBottom: bottom,
        justifyContent: 'space-between',
      }}
    >
      <Header />
      <MovieDateAndTimings />
      <Tickets />
      <Footer />
    </View>
  );
}
