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
import { useNavigation } from "@react-navigation/native";

import StyledButton from "../components/StyledButton";
import GeneralStyles from "../constants/GeneralStyles";

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

    return () => {
      backHandler;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={GeneralStyles.title}>Congratulations!!!</Text>

      <Image
        source={require("../../assets/win.png")}
        style={{
          width: width * 0.95,
          height: height * 0.4,
        }}
        resizeMode="contain"
      />
      <Text style={styles.text}>You took all the steps you specified!</Text>
      <Text style={styles.text}>Walked steps: {specifiedSteps}</Text>
      <Text
        style={{
          ...GeneralStyles.defaultText,
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
  text: {
    ...GeneralStyles.defaultText,
    marginBottom: 10,
  },
});

export default MessageScreen;
