import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";

import { setSpecifiedSteps } from "../store/actions/StepActions";

import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";

const { height } = size;

const SetWalkScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
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
          style={{ ...styles.input, marginBottom: error ? 0 : height * 0.04 }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={GlobalStyles.defaultText}>Number of steps: </Text>
            <StyledInput
              onFocus={() => setError("")}
              onChangeText={(text: string) =>
                setNumber(Number(text).toFixed(0))
              }
            />
          </View>
          {error ? (
            <Text style={{ color: "red", marginVertical: height * 0.02 }}>
              {error}
            </Text>
          ) : null}
        </View>

        <StyledButton
          title="Set & Start"
          onPress={() => {
            const num = Number(number);

            //validation for input.
            if (isFinite(num) && num >= 5) {
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  input: {
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  guide: {
    ...GlobalStyles.defaultText,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SetWalkScreen;
