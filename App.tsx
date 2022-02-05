import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch } from "react-redux";
import { combineReducers, createStore } from "redux";

import AppNavigation from "./src/navigation/AppNavigation";
import StepReducer from "./src/store/reducers/StepReducer";
import UserInfoReducer from "./src/store/reducers/UserInfoReducer";

export default function App() {
  const reducers = combineReducers({
    step: StepReducer,
    userInfo: UserInfoReducer,
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
