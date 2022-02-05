import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import colors from "../constants/colors";
import size from "../constants/size";

const { width, height } = size;
const buttonHeight = height * 0.06;

function StyledButton(props: any) {
  const { title, onPress } = props;

  return (
    <Button
      title={title}
      buttonStyle={styles.button}
      onPress={onPress}
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: width * 0.35,
    height: buttonHeight,
    backgroundColor: colors.primary,
    borderRadius: buttonHeight / 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  container: {
    elevation: 3,
    borderRadius: buttonHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StyledButton;
