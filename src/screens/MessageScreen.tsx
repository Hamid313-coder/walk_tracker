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
import { useSelector } from "react-redux";

import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
import { useDoubleBackPressExit } from "../helpers/DoublePressToExit";
const { width, height } = Dimensions.get("screen");
const MessageScreen = () => {
  const { specifiedSteps, walkedDistance, distanceMeasureUnit } = useSelector(
    (state) => state.step
  );
  const navigation = useNavigation();
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.navigate("setWalk");
        return true;
      }
    );
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.primary,
          fontWeight: "bold",
          fontSize: width > 356 ? 28 : 23,
        }}
      >
        Congratulations!!!
      </Text>

      <Image
        source={require("../../assets/win.png")}
        style={{
          width: width * 0.95,
          height: height * 0.4,
        }}
        resizeMode="contain"
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.secondary,
          marginBottom: 10,
        }}
      >
        You took all the steps you specified!
      </Text>
      <Text
        style={{
          color: colors.secondary,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
        }}
      >
        Walked steps: {specifiedSteps}
      </Text>
      <Text
        style={{
          color: colors.secondary,
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: height * 0.04,
        }}
      >
        Walked distance: {walkedDistance.toFixed(1)} {distanceMeasureUnit}
      </Text>

      <StyledButton
        title="Walk again"
        onPress={() => navigation.navigate("setWalk")}
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
