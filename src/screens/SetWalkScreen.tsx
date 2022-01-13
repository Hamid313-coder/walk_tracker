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
import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const SetWalkScreen = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{ color: colors.primary, fontSize: width > 356 ? 28 : 23 }}
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
          <Text style={{ color: colors.secondary, fontSize: 15 }}>
            Number of steps:{" "}
          </Text>
          <Input
            keyboardType="numeric"
            onChangeText={(text) => setNumber(text)}
            inputStyle={{
              color: colors.secondary,
              textAlign: "center",
              fontSize: 16,
            }}
            containerStyle={{
              borderColor: colors.secondary,
              width: width * 0.17,
            }}
            inputContainerStyle={{ borderBottomColor: colors.secondary }}
          />
        </View>
        <StyledButton
          title="Set & Start"
          onPress={() => {
            const num = Number(number);
            if (!isNaN(num) && num > 0) {
              setError("");
            } else {
              setError(
                isNaN(num)
                  ? "Please enter a number!"
                  : "Please enter a valid number!"
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
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
  },
  guide: {
    color: colors.secondary,
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default SetWalkScreen;
