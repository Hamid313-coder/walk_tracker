import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { combineReducers, createStore } from "redux";
import AppNavigation from "./src/navigation/AppNavigation";
import MapScreen from "./src/screens/MapScreen";
import MessageScreen from "./src/screens/MessageScreen";
import SetWalkScreen from "./src/screens/SetWalkScreen";
import StepReducer from "./src/store/reducers/StepReducer";
import UserInfoReducer from "./src/store/reducers/UserInfoReducer";
import GlobalStyles from "./src/constants/GlobalStyles";
import colors from "./src/constants/colors";

export default function App() {
  const reducers = combineReducers({
    step: StepReducer,
    userInfo: UserInfoReducer,
  });
  const store = createStore(reducers);
  const [isUserInfoAvailable, setIsUserInfoAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const userInfo = await AsyncStorageLib.getItem("userInfo");
      setIsUserInfoAvailable(!!userInfo);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={GlobalStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <AppNavigation isUserInfoAvailable={isUserInfoAvailable} />
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
