import RequestTypes from '../constants/RequestTypes';

const initialState = {
  temperatures: [],
  humidities: [],
  snapshots: [],
  snapshot: {},
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RequestTypes.REQUEST_TEMP_AND_HUM:
      return { ...state,
        ...action.payload,
        isLoading: true,
      };
    case RequestTypes.RECEIVE_TEMP_AND_HUM:
      return { ...state,
        temperatures: [
          ...action.payload.temperatures,
        ],
        humidities: [
          ...action.payload.humidities,
        ],
        isLoading: false,
      };
    case RequestTypes.REQUEST_SNAPSHOTS:
      return { ...state,
        ...action.payload,
        isLoading: true,
      };
    case RequestTypes.RECEIVE_SNAPSHOTS:
      return { ...state,
        snapshots: [
          ...action.payload.snapshots,
        ],
        isLoading: false,
      };
    case RequestTypes.REQUEST_SNAPSHOT:
      return { ...state,
        ...action.payload,
        isLoading: true,
      };
    case RequestTypes.RECEIVE_SNAPSHOT:
      return { ...state,
        snapshot: action.payload.snapshot,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
