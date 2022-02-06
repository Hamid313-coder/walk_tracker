import React from "react";
import { StyleSheet } from "react-native";
import { Input } from "react-native-elements";

import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";

const { width, height } = size;

function StyledInput(props: any) {
  return (
    <Input
      keyboardType="numeric"
      onFocus={props.onFocus}
      onChangeText={props.onChangeText}
      renderErrorMessage={false}
      inputStyle={styles.input}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: height * 0.06,
    width: width * 0.198,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    ...GlobalStyles.defaultText,
    textAlign: "center",
  },
  inputContainer: {
    position: "absolute",
    height: height * 0.035,
    width: width * 0.195,
  },
});

export default StyledInput;
