import { Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { CheckBox, Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import RadioButton from "../components/RadioButton";
import StyledButton from "../components/StyledButton";
import colors from "../constants/colors";
const { width, height } = Dimensions.get("screen");
function CustomScreen() {
  const [isMale, setIsMale] = useState<boolean>(true);
  const [userHeight, setUserHeight] = useState<String>();
  const [error, setError] = useState<String>("");
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 5,
            marginBottom: error ? 0 : 30,
          }}
        >
          <Text style={styles.text}>Height:</Text>
          <Input
            inputContainerStyle={{
              justifyContent: "center",
              alignSelf: "center",
              height: height * 0.035,
              width: width * 0.18,
            }}
            containerStyle={{
              height: height * 0.06,
              width: width * 0.195,
              justifyContent: "center",
            }}
            keyboardType="numeric"
            textAlign="center"
            inputStyle={styles.text}
            renderErrorMessage={false}
            onFocus={() => setError("")}
            onChangeText={(text) => setUserHeight(text)}
          />
          <Text style={styles.text}>cm</Text>
        </View>
        {error ? (
          <Text
            style={{
              color: "red",
              marginVertical: 10,
            }}
          >
            {error}
          </Text>
        ) : null}
        <StyledButton
          title="Next"
          onPress={() => {
            const num = Number(userHeight);
            console.log(num);

            //validation for input.
            if (isFinite(num) && num > 0) {
              // dispatch(setSpecifiedSteps(num));
              setError("");
              navigation.navigate("setWalk");
            } else {
              setError(
                num <= 0
                  ? "Please enter a valid number!"
                  : "Please enter a number!"
              );
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: width * 0.95,
    height: height * 0.4,
    marginTop: height * 0.02,
  },
  text: { fontSize: 18, color: colors.secondary, fontWeight: "bold" },
});

export default CustomScreen;
