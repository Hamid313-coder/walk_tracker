import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Card, Input } from "react-native-elements";
import colors from "../constants/colors";
function MapScreen(props: any) {
  const [curLocation, setCurLocation] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
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
        <Card
          containerStyle={{
            height: 75,
            width: "100%",
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.primary,
                fontWeight: "bold",
              }}
            >
              Walked steps
            </Text>
            <Text>232</Text>
          </View>
        </Card>
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
