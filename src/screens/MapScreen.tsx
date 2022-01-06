import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
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
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
});

export default MapScreen;
