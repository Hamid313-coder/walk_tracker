import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {startCounter, stopCounter} from 'react-native-accurate-step-counter';
// import MapboxGL from "@react-native-mapbox-gl/maps";
// import { lineString } from "@turf/helpers";
import Ionicons from 'react-native-vector-icons/Ionicons';

import StyledCard from '../components/StyledCard';

import {setWalkedDistance} from '../store/actions/StepActions';

import GlobalStyles from '../constants/GlobalStyles';
import colors from '../constants/colors';
import size from '../constants/size';
// import MAPBOX_ACCESS_TOKEN from '../constants/MAPBOX_ACCESS_TOKEN';

const {width, height} = size;

function MapScreen() {
  // MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

  // const [curLocation, setCurLocation] = useState<Location.LocationObject>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [route, setRoute] = useState();
  const [steps, setSteps] = useState<number>(0);
  const [coords, setCoords] = useState([]);
  const [distance, setDistance] = useState<number>(0);
  const [unit, setUnit] = useState('cm');
  const spNumber = useSelector(state => state.step.specifiedSteps);
  const userGender = useSelector(state => state.userInfo.gender);
  const userHeight = useSelector(state => state.userInfo.height);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const STEP_LENGTH =
    (userHeight * (userGender === 'male' ? 0.415 : 0.413)) / 2;

  //-----------------------Getting the initial user location------------------------------
  // useEffect(() => {
  //   setIsLoading(true);
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     const mapPer = await MapboxGL.requestAndroidLocationPermissions();

  //     if (status !== "granted" && !mapPer) {
  //       alert("Permission to access location denied!");
  //       return;
  //     }
  //     const location = await Location.getCurrentPositionAsync({
  //       accuracy: Location.LocationAccuracy.BestForNavigation,
  //     });
  //     coords.push([location.coords.longitude, location.coords.latitude]);
  //     setCurLocation(location);
  //     setIsLoading(false);
  //   })();
  // }, []);

  //------------------------Drawing user walked path----------------------------------
  // useEffect(() => {
  //   if (coords.length > 1) {
  //     const newRoute = lineString(coords);
  //     setRoute(newRoute);
  //   }
  // }, [coords]);

  //---------------------------Counting steps and setting the distance  measure unit----------------------------------
  useEffect(() => {
    const config = {
      default_threshold: 15.0,
      default_delay: 150000000,
      cheatInterval: 3000,
      onStepCountChange: (stepCount: any) => {
        const dist = stepCount * STEP_LENGTH;
        if (dist >= 100 && dist < 100000) {
          setDistance(dist / 100);
          setUnit('m');
        } else if (dist >= 100000) {
          setDistance(dist / 100000);
          setUnit('km');
        } else {
          setDistance(dist);
        }
        setSteps(stepCount);
      },
      onCheat: () => {
        alert("Please don't cheat!");
      },
    };
    startCounter(config);
    return () => {
      stopCounter();
    };
  }, []);

  //------------------------------Navigate to message screen when the steps completed-------------------
  useEffect(() => {
    if (steps === spNumber) {
      dispatch(setWalkedDistance(distance, unit));
      navigation.navigate('message');
    }
  }, [steps]);

  if (isLoading) {
    return (
      <View style={GlobalStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      {/* {curLocation && (
        <MapboxGL.MapView
          style={styles.map}
          // styleURL={MapboxGL?.StyleURL?.Outdoors}
        >
          {route && (
            <MapboxGL.ShapeSource shape={route} id="lineShape">
              <MapboxGL.LineLayer
                id="lineId"
                style={{
                  lineWidth: 5,
                  lineJoin: "bevel",
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
      )} */}
      <View style={styles.bottomContainer}>
        <StyledCard title="Specified steps" rest={spNumber} />
        <StyledCard title="Walked steps" rest={steps} />
        <StyledCard
          title="Walked distance"
          rest={`${distance?.toFixed(1)} ${unit}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    height: height * 0.62,
    width: width,
  },
  bottomContainer: {
    backgroundColor: colors.white,
    width,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-evenly',
    flex: 1,
  },
  backButton: {
    width: 45,
    height: 45,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    zIndex: 100,
    position: 'absolute',
    top: 10,
    left: 15,
  },
});

export default MapScreen;
