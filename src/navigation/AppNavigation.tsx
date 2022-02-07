import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import CustomScreen from "../screens/CustomScreen";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import SetWalkScreen from "../screens/SetWalkScreen";

import { setUserInfo } from "../store/actions/UserInfoActions";

import colors from "../constants/colors";
import GlobalStyles from "../constants/GlobalStyles";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const [isUserInfoAvailable, setIsUserInfoAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //----------------------checking for user info---------------------------------------
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const userInfo = JSON.parse(await AsyncStorageLib.getItem("userInfo"));
      userInfo
        ? dispatch(setUserInfo(userInfo.gender, userInfo.userHeight))
        : null;
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
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isUserInfoAvailable ? "setWalk" : "custom"}
        screenOptions={{ headerShown: false, statusBarStyle: "dark" }}
      >
        <Stack.Screen name="custom" component={CustomScreen} />
        <Stack.Screen name="setWalk" component={SetWalkScreen} />
        <Stack.Screen name="map" component={MapScreen} />
        <Stack.Screen name="message" component={MessageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
