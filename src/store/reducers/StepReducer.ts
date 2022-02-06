import {
  SET_SPECIFIED_STEPS,
  SET_WALKED_DISTANCE,
} from "../actions/StepActions";

const initialState = {
  specifiedSteps: null,
  walkedDistance: null,
  distanceMeasureUnit: null,
};

const StepReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SPECIFIED_STEPS:
      return { ...state, specifiedSteps: action.stepsNumber };
    case SET_WALKED_DISTANCE:
      return {
        ...state,
        walkedDistance: action.walkedDistance,
        distanceMeasureUnit: action.distanceMeasureUnit,
      };
    default:
      return state;
  }
};

export default StepReducer;
