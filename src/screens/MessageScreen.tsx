import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("screen");
const MessageScreen = () => {
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
      <StyledButton title="Walk again" onPress={() => console.log("hello")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageScreen;
