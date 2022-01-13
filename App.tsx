import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import AppNavigation from "./src/navigation/AppNavigation";
import MapScreen from "./src/screens/MapScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SetWalkScreen from "./src/screens/SetWalkScreen";
import StepReducer from "./src/store/reducers/StepReducer";

export default function App() {
  const reducers = combineReducers({
    step: StepReducer,
  });
  const store = createStore(reducers);
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
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
