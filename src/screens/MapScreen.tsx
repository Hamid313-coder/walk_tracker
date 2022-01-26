import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Dimensions,
  Pressable,
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
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { startCounter, stopCounter } from "react-native-accurate-step-counter";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {
  Feature,
  LineString,
  lineString,
  Position,
  Properties,
} from "@turf/helpers";
import { LocationObject } from "expo-location";
// import Dialog from "react-native-dialog";
const { width, height } = Dimensions.get("window");
function MapScreen(props: any) {
  MapboxGL.setAccessToken(
    "sk.eyJ1IjoiaGFtaWRodXNzYWlueSIsImEiOiJja3lwbmJucWIwYm8yMzJucGNxM2g5OTYzIn0.CsdiL49YksEl7193h1HQlg"
  );
  const [curLocation, setCurLocation] = useState<LocationObject>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [route, setRoute] = useState();
  const [steps, setSteps] = useState<number>(0);
  const spNumber = useSelector((state) => state.step.specifiedSteps);
  const [coords, setCoords] = useState([]);

  ////////////////
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const navigation = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const mapPer = await MapboxGL.requestAndroidLocationPermissions();

      if (status !== "granted" && !mapPer) {
        alert("Permission to access location denied!");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.LocationAccuracy.BestForNavigation,
      });
      coords.push([location.coords.longitude, location.coords.latitude]);
      setCurLocation(location);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (coords.length > 1) {
      const newRoute = lineString(coords);
      setRoute(newRoute);
    }
  }, [coords]);

  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount: any) => {
        setSteps(stepCount);
      },
      onCheat: () => {
        console.log("User is Cheating");
      },
    };
    startCounter(config);
    return () => {
      stopCounter();
    };
  }, []);

  useEffect(() => {
    if (steps === spNumber) {
      navigation.navigate("message");
    }
  }, [steps]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Dialog onBackdropPress={() => setIsVisible(false)} isVisible={isVisible}>
        <Dialog.Title
          title={`Are you sure to change the number of steps? Your specified number is ${spNumber}`}
          titleStyle={{ color: colors.primary }}
        />
        <Input keyboardType="numeric" textAlign="center" />
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
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          width: 45,
          height: 45,
          backgroundColor: "lightgrey",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25,
          zIndex: 100,
          position: "absolute",
          top: 10,
          left: 15,
        }}
      >
        <Text style={{ fontSize: 14 }}>👈🏻</Text>
      </Pressable>
      {curLocation && (
        <MapboxGL.MapView
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Outdoors}
        >
          {route && (
            <MapboxGL.ShapeSource shape={route} id="lineShape">
              <MapboxGL.LineLayer
                id="lineId"
                style={{
                  lineWidth: 5,
                  lineJoin: "miter",
                  lineColor: colors.secondary,
                }}
              />
            </MapboxGL.ShapeSource>
          )}
          <MapboxGL.UserLocation
            minDisplacement={5}
            androidRenderMode="compass"
            visible
            onUpdate={(uLocation) => {
              coords.push([
                uLocation.coords.longitude,
                uLocation.coords.latitude,
              ]);
              setCoords([...coords]);
            }}
          />

          <MapboxGL.Camera
            followUserLocation
            zoomLevel={17}
            centerCoordinate={[
              curLocation.coords.longitude,
              curLocation.coords.latitude,
            ]}
          ></MapboxGL.Camera>
        </MapboxGL.MapView>
      )}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={styles.touch}
        >
          <StyledCard title="Specified steps" rest={spNumber} />
        </TouchableOpacity>

        <StyledCard title="Walked steps" rest={steps} />
        <StyledCard title="Walked distance" rest="2343m" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: height * 0.62,
    width: width,
  },
  bottomContainer: {
    backgroundColor: "white",
    width: width,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-evenly",
    flex: 1,
  },
  touch: {
    width: "100%",
    alignItems: "center",
    height: height * 0.1,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default MapScreen;
