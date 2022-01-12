import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MapScreen from "../screens/MapScreen";
import MessageScreen from "../screens/MessageScreen";
import SetWalkScreen from "../screens/SetWalkScreen";
const Stack = createNativeStackNavigator();
function AppNavigation(props: any) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SetWalk"
        defaultScreenOptions={{
          headerShown: false,
          statusBarStyle: "auto",
        }}
      >
        <Stack.Screen
          name="SetWalk"
          component={SetWalkScreen}
          options={{ headerShown: false, statusBarStyle: "dark" }}
        />
        <Stack.Screen
          name="Map"
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
