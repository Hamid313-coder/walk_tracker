import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";

import { setSpecifiedSteps } from "../store/actions/StepActions";

import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";
import colors from "../constants/colors";

const { height } = size;

const SetWalkScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  return (
    <ScrollView contentContainerStyle={GlobalStyles.container}>
      <View style={styles.center}>
        <Text style={GlobalStyles.title}>Let's have some walking!</Text>
        <Image
          source={require("../../assets/wal.png")}
          style={GlobalStyles.image}
          resizeMode="contain"
        />
        <Text style={styles.guide}>
          Set the number of steps you want walk to today!
        </Text>

        <View
          style={{
            ...styles.inputWrapper,
            marginBottom: error ? 0 : height * 0.04,
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={GlobalStyles.defaultText}>Number of steps: </Text>
            <StyledInput
              onFocus={() => setError("")}
              onChangeText={(text: string) =>
                setNumber(Number(text.trim()).toFixed(0))
              }
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <StyledButton
          title="Set & Start"
          onPress={() => {
            const num = Number(number);

            //validation for input.
            if (isFinite(num) && num >= 500) {
              dispatch(setSpecifiedSteps(num));
              setError("");
              navigation.navigate("map");
            } else {
              setError(
                num < 500
                  ? "Sorry! It must be at least 500."
                  : "Please enter a number!"
              );
            }
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          navigation.navigate("custom");
        }}
        style={styles.setting}
      >
        <Text style={styles.textSetting}>Change height and gender</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  guide: {
    ...GlobalStyles.defaultText,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  error: {
    color: "red",
    marginVertical: height * 0.02,
  },
  setting: {
    position: "absolute",
    bottom: size.height * 0.03,
  },
  textSetting: {
    color: colors.secondary,
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

export default SetWalkScreen;
