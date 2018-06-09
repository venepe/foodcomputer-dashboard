import axios from 'axios';
import RequestTypes from '../constants/RequestTypes';
import { projectUrl } from '../config';
import { Events, track } from '../utils/MAnalytics';

export const requestTemperaturesAndHumidities = payload => ({
  type: RequestTypes.REQUEST_TEMP_AND_HUM,
  ...payload,
});

export const receiveTemperaturesAndHumidities = payload => ({
  type: RequestTypes.RECEIVE_TEMP_AND_HUM,
  ...payload,
});

export const requestSnapshots = payload => ({
  type: RequestTypes.REQUEST_SNAPSHOTS,
  ...payload,
});

export const receiveSnapshots = payload => ({
  type: RequestTypes.RECEIVE_SNAPSHOTS,
  ...payload,
});

export const requestSnapshot = payload => ({
  type: RequestTypes.REQUEST_SNAPSHOT,
  ...payload,
});

export const receiveSnapshot = payload => ({
  type: RequestTypes.RECEIVE_SNAPSHOT,
  ...payload,
});

export const fetchTemperaturesAndHumidities = () =>
  (dispatch) => {
    dispatch(requestTemperaturesAndHumidities());
    track(Events.VIEWED_TEMPERATURES, {});
    const endpoints = ['temperatures', 'humidities'];

    let promises = endpoints.map((endpoint, index) => axios.get(
      `${projectUrl}/${endpoint}`));

    Promise.all(promises)
    .then((result) => {
      const temperatures = result[0].data;
      const humidities = result[1].data;
      dispatch(receiveTemperaturesAndHumidities({ payload: { temperatures, humidities } }));
    })
  };

export const fetchSnapshots = () =>
  (dispatch) => {
    dispatch(requestSnapshots());
    track(Events.VIEWED_SNAPSHOTS, {});

    axios.get(`${projectUrl}/snapshots`)
      .then((result) => {
        const snapshots = result.data;
        console.log(snapshots);
        dispatch(receiveSnapshots({ payload: { snapshots } }));
      });
  };

export const fetchSnapshot = id =>
  (dispatch, getState) => {
    dispatch(requestSnapshot());
    track(Events.VIEWED_SNAPSHOT, { id });

    const snapshot = getState().snapshots.find((snapshot) => {
      if (snapshot.id === id) {
        return snapshot;
      }
    });

    if (snapshot) {
      dispatch(receiveSnapshot({ payload: { snapshot } }));
    } else {
      axios.get(`${projectUrl}/snapshots/${id}`)
        .then((result) => {
          const snapshot = result.data;
          dispatch(receiveSnapshot({ payload: { snapshot } }));
        });
    }
  };

const actions = {
  requestTemperaturesAndHumidities,
  requestSnapshots,
};

export default actions;
