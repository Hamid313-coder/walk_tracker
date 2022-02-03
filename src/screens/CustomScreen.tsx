import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import RadioButton from "../components/RadioButton";
import StyledButton from "../components/StyledButton";
import StyledInput from "../components/StyledInput";

import { setUserInfo } from "../store/actions/UserInfoActions";

import GlobalStyles from "../constants/GlobalStyles";
import size from "../constants/size";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

const { height } = size;

function CustomScreen() {
  const [isMale, setIsMale] = useState<boolean>(true);
  const [userHeight, setUserHeight] = useState<String>();
  const [error, setError] = useState<String>("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={GlobalStyles.title}>Specify your height & gender</Text>
        <Image
          source={require("../../assets/cust.png")}
          style={{ ...GlobalStyles.image, marginTop: height * 0.02 }}
        />
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
            marginBottom: error ? 0 : height * 0.04,
          }}
        >
          <Text style={GlobalStyles.defaultText}>Height:</Text>
          <StyledInput
            onFocus={() => setError("")}
            onChangeText={(text: string) => setUserHeight(text)}
          />
          <Text style={GlobalStyles.defaultText}>cm</Text>
        </View>
        {error ? (
          <Text
            style={{
              color: "red",
              marginVertical: height * 0.02,
            }}
          >
            {error}
          </Text>
        ) : null}
        <StyledButton
          title="Next"
          onPress={async () => {
            const num = Number(userHeight);
            //validation for input.
            if (isFinite(num) && num > 0) {
              dispatch(setUserInfo(isMale ? "male" : "female", num));
              setError("");
              await AsyncStorageLib.setItem(
                "userInfo",
                JSON.stringify({
                  gender: isMale ? "male" : "female",
                  userHeight: num,
                })
              );
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
});

export default CustomScreen;
