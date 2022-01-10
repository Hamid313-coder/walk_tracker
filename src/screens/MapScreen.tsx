import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Dialog, Input } from "react-native-elements";
import colors from "../constants/colors";
import StyledCard from "../components/StyledCard";
// import Dialog from "react-native-dialog";
function MapScreen(props: any) {
  const [curLocation, setCurLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { width, height } = Dimensions.get("window");
  const SCREEN_HEIGHT = height;
  const SCREEN_WIDTH = width;
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location denied!");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });

      setCurLocation(location);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Dialog onBackdropPress={() => setIsVisible(false)} isVisible={isVisible}>
        <Dialog.Title
          title="Are you sure to change the number of steps?"
          titleStyle={{ color: colors.primary }}
        />
        <Input
          keyboardType="numeric"
          textAlign="center"
           
        />

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <View style={{ overflow: "hidden", borderRadius: 3 }}>
            <Dialog.Button
              buttonStyle={{ backgroundColor: "transparent" }}
              title="Okay"
              titleStyle={{ color: colors.secondary }}
              onPress={() => console.log("pressed okay!")}
            />
          </View>
          <View style={{ overflow: "hidden", borderRadius: 3 }}>
            <Dialog.Button
              containerStyle={{ marginLeft: 15 }}
              buttonStyle={{ backgroundColor: "transparent" }}
              title="Cancel"
              titleStyle={{ color: colors.secondary }}
              onPress={() => setIsVisible(false)}
            />
          </View>
        </View>
      </Dialog>
      {curLocation && (
        <MapView
          initialRegion={{
            latitude: curLocation?.coords?.latitude,
            longitude: curLocation?.coords?.longitude,
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
          }}
          showsBuildings
          showsUserLocation
          followsUserLocation
          loadingEnabled
          loadingIndicatorColor="orange"
          provider={null}
          style={styles.map}
        >
          {curLocation && (
            <Marker
              title="Me"
              description="This is Me"
              coordinate={{
                latitude: curLocation.coords.latitude,
                longitude: curLocation.coords.longitude,
              }}
            />
          )}
        </MapView>
      )}
      <View
        style={{
          width: width,
          alignItems: "center",
          padding: 10,
          justifyContent: "space-evenly",
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            maxHeight: 75,
          }}
        >
          <StyledCard title="Specified steps" rest="234" />
        </TouchableOpacity>
        <StyledCard title="Walked steps" rest="223234" />
        <StyledCard title="Walked distance" rest="2343m" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("screen").height * 0.56,
    width: Dimensions.get("screen").width,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default MapScreen;
