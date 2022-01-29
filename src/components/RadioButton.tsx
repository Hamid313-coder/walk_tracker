import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";
import colors from "../constants/colors";

function RadioButton(props: any) {
  return (
    <CheckBox
      checkedIcon={
        <MaterialCommunityIcons
          name="radiobox-marked"
          size={24}
          color={colors.secondary}
        />
      }
      uncheckedIcon={
        <MaterialCommunityIcons
          name="radiobox-blank"
          size={24}
          color={colors.secondary}
        />
      }
      checked={props.checked}
      checkedColor={colors.primary}
      title={props.title}
      textStyle={{ color: colors.secondary, fontSize: 18 }}
      onPress={props.onPress}
      containerStyle={{ backgroundColor: "white", borderColor: "white" }}
    />
  );
}

const styles = StyleSheet.create({});
export default RadioButton;
