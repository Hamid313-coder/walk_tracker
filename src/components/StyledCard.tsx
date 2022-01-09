import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-elements";
import colors from "../constants/colors";

function StyledCard(props: any) {
  const { title, rest } = props;
  return (
    <Card containerStyle={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rest}>{rest}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 75,
    width: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
  rest: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default StyledCard;
