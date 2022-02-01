import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Input } from "react-native-elements";
import { useDispatch } from "react-redux";
import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
import { setSpecifiedSteps } from "../store/actions/StepActions";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const SetWalkScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: colors.primary,
            fontSize: width > 356 ? 28 : 23,
            fontWeight: "bold",
          }}
        >
          Let's have some walking!
        </Text>
        <Image
          source={require("../../assets/wal.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.guide}>
          Set the number of steps you want walk to today!
        </Text>

        <View style={styles.input}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.secondary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Number of steps:{" "}
            </Text>
            <Input
              keyboardType="numeric"
              onFocus={() => setError("")}
              onChangeText={(text) => setNumber(Number(text).toFixed(0))}
              inputStyle={{
                color: colors.secondary,
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
              }}
              inputContainerStyle={{
                position: "absolute",
                height: height * 0.035,
                width: width * 0.195,
              }}
              containerStyle={{
                flexDirection: "column",
                height: height * 0.06,
                width: width * 0.198,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </View>
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
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
  image: {
    width: width * 0.95,
    height: height * 0.4,
  },

  input: {
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  guide: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SetWalkScreen;
