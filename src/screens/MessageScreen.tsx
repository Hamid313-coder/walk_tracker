import React, { useEffect } from "react";
import { BackHandler, Image, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import StyledButton from "../components/StyledButton";

import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";

const MessageScreen = () => {
  const { specifiedSteps, walkedDistance, distanceMeasureUnit } = useSelector(
    (state) => state.step
  );
  const navigation = useNavigation();

  //----------------------Navigating back to the setWalk screen---------------------------
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
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Congratulations!!!</Text>

      <Image
        source={require("../../assets/win.png")}
        style={GlobalStyles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>You took all the steps you specified!</Text>
      <Text style={styles.text}>Walked steps: {specifiedSteps}</Text>
      <Text style={styles.distanceText}>
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
  text: {
    ...GlobalStyles.defaultText,
    marginBottom: 10,
  },
  distanceText: {
    ...GlobalStyles.defaultText,
    marginBottom: size.height * 0.04,
  },
});

export default MessageScreen;
