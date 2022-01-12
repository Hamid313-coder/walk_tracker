import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import AppNavigation from "./src/navigation/AppNavigation";
import MapScreen from "./src/screens/MapScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SetWalkScreen from "./src/screens/SetWalkScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <MapScreen /> */}
      {/* <SetWalkScreen /> */}
      {/* <MessageScreen /> */}
      <AppNavigation />
      <StatusBar style="auto" backgroundColor="transparent" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
