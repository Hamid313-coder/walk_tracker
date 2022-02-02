import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";

import colors from "../constants/colors";
import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";

function StyledCard(props: any) {
  const { title, rest } = props;

  return (
    <Card containerStyle={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={GlobalStyles.defaultText}>{title}</Text>
        <Text style={styles.rest}>{rest}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: size.height * 0.075,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
  rest: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default StyledCard;
