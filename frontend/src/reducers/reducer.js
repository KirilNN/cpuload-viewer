import { LOAD_DATA_SUCCESS } from "../actions/actions";
import { updateData, generateInitialLoadData } from "./helpers/loadHelper";

const initialState = {
  dashboard: {
    cpuLoad: generateInitialLoadData(),
    highLoads: [],
    recovers: [],
    isUnderHighLoad: false
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS: {
      const { dashboard } = updateData(state, action);
      return {
        ...state,
        dashboard
      };
    }
    default: {
      return state;
    }
  }
}
