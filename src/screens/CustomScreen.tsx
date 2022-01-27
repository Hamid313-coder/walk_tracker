import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("screen");
function CustomScreen() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.primary,
          fontSize: width > 356 ? 26 : 21,
          paddingHorizontal: 10,
        }}
      >
        Specify your height & gender
      </Text>
      <Image source={require("../../assets/cust.png")} style={styles.image} />
      <CheckBox
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked
        checkedColor={colors.primary}
        title="male"
        containerStyle={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: width * 0.95,
    height: height * 0.4,
    marginTop: 20,
  },
});

export default CustomScreen;
