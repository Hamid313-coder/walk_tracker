export const SET_SPECIFIED_STEPS = "SET_SPECIFIED_STEPS";
export const SET_WALKED_DISTANCE = "SET_WALKED_DISTANCE";

export const setSpecifiedSteps = (stepsNumber: number) => {
  return { type: SET_SPECIFIED_STEPS, stepsNumber };
};

export const setWalkedDistance = (distance: number, measureUnit: string) => {
  return {
    type: SET_WALKED_DISTANCE,
    walkedDistance: distance,
    distanceMeasureUnit: measureUnit,
  };
};
