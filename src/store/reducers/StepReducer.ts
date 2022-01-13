import { SET_SPECIFIED_STEPS } from "../actions/StepActions";

const initialState = {
  specifiedSteps: null,
  walkedSteps: null,
  traveledDistance: null,
  routCoords: [],
};

const StepReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SPECIFIED_STEPS:
      return { ...state, specifiedSteps: action.stepsNumber };
  }
};

export default StepReducer;
