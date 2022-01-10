import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("screen");
function StyledButton(props: any) {
  const { title, onPress } = props;
  return <Button title={title} buttonStyle={styles.button} onPress={onPress} />;
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.35,
    height: height * 0.06,
    backgroundColor: colors.primary,
    borderRadius: (height * 0.06) / 2,
  },
});
export default StyledButton;
