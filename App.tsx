import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MapScreen from "./src/screens/MapScreen";
import SetWalkScreen from "./src/screens/SetWalkScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <MapScreen />
      {/* <SetWalkScreen /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
