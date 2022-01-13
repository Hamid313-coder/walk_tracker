import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
import { useDoubleBackPressExit } from "../helpers/DoublePressToExit";
const { width, height } = Dimensions.get("screen");
const MessageScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("SetWalk");
        return true;
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.primary, fontSize: width > 356 ? 28 : 23 }}>
        Congratulations!!!
      </Text>

      <Image
        source={require("../../assets/win.png")}
        style={{ width: width * 0.95, height: height * 0.4 }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 18,
          color: colors.secondary,
          marginBottom: height * 0.08,
        }}
      >
        You took all the steps you specified.
      </Text>
      <StyledButton
        title="Walk again"
        onPress={() => navigation.navigate("SetWalk")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default MessageScreen;
