import { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import AppNavigation from "./src/navigation/AppNavigation";

import StepReducer from "./src/store/reducers/StepReducer";
import UserInfoReducer from "./src/store/reducers/UserInfoReducer";

import colors from "./src/constants/colors";

export default function App() {
  const reducers = combineReducers({
    step: StepReducer,
    userInfo: UserInfoReducer,
  });
  const store = createStore(reducers);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
    backgroundColor: colors.white,
  },
});
