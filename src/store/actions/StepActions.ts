export const SET_SPECIFIED_STEPS = "SET_SPECIFIED_STEPS";

export const setSpecifiedSteps = (stepsNumber: number) => {
  return { type: SET_SPECIFIED_STEPS, stepsNumber };
};
