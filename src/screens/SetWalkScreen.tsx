import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import colors from "../constants/colors";
const SetWalkScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: colors.primary, fontSize: 28 }}>
          Let's have some walking!
        </Text>
        <Image
          source={require("../../assets/wal.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text
          style={{
            color: colors.secondary,
            fontSize: 16,
            textAlign: "center",
            paddingHorizontal: 20,
          }}
        >
          Set the number of steps you want walk to today!
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.secondary }}>Number of steps: </Text>
          <Input
            keyboardType="numeric"
            inputStyle={{
              color: colors.secondary,
              textAlign: "center",
              fontSize: 16,
            }}
            containerStyle={{ borderColor: colors.secondary, width: 70 }}
            inputContainerStyle={{ borderBottomColor: colors.secondary }}
          />
        </View>
        <Button
          title="Set & Start"
          buttonStyle={{
            width: 160,
            height: 50,
            backgroundColor: colors.primary,
            borderRadius: 30,
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 350,
  },
});

export default SetWalkScreen;
