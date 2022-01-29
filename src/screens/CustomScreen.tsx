import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import RadioButton from "../components/RadioButton";
import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("screen");
function CustomScreen() {
  const [isMale, setIsMale] = useState(true);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: colors.primary,
          fontSize: width > 356 ? 26 : 21,
          paddingHorizontal: 10,
          fontWeight: "bold",
        }}
      >
        Specify your height & gender
      </Text>
      <Image source={require("../../assets/cust.png")} style={styles.image} />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <RadioButton
          title="Male"
          checked={isMale}
          onPress={() => setIsMale(true)}
        />
        <RadioButton
          title="Female"
          checked={!isMale}
          onPress={() => setIsMale(false)}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Text style={styles.text}>Height: </Text>
        <Input
          inputContainerStyle={{
            justifyContent: "center",
            alignSelf: "center",
            height: 30,
            width: 70,
          }}
          containerStyle={{
            height: 50,
            width: 80,

            justifyContent: "center",
          }}
          keyboardType="numeric"
          textAlign="center"
          inputStyle={styles.text}
          renderErrorMessage={false}
        />
        <Text style={styles.text}>cm</Text>
      </View>
      <StyledButton title="Next" />
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
  text: { fontSize: 18, color: colors.secondary, fontWeight: "bold" },
});

export default CustomScreen;
