import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CustomScreen from "../screens/CustomScreen";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import SetWalkScreen from "../screens/SetWalkScreen";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function AppNavigation(props: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={props.isUserInfoAvailable ? "setWalk" : "custom"}
        defaultScreenOptions={{
          headerShown: false,
          statusBarStyle: "dark",
        }}
      >
        <Stack.Screen
          name="custom"
          component={CustomScreen}
          options={{ headerShown: false, statusBarStyle: "dark" }}
        />

        <Stack.Screen
          name="setWalk"
          component={SetWalkScreen}
          options={{ headerShown: false, statusBarStyle: "dark" }}
        />
        <Stack.Screen
          name="map"
          component={MapScreen}
          options={{
            headerShown: false,
            statusBarStyle: "dark",
          }}
        />
        <Stack.Screen
          name="message"
          component={MessageScreen}
          options={{ headerShown: false, statusBarStyle: "dark" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
