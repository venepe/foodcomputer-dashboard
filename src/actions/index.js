import axios from 'axios';
import RequestTypes from '../constants/RequestTypes';
import { projectUrl } from '../config';

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

export const fetchTemperaturesAndHumidities = () =>
  (dispatch) => {
    dispatch(requestTemperaturesAndHumidities());
    const endpoints = ['temperatures', 'humidities'];

    console.log('fetchTemperaturesAndHumidities');
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

    console.log('fetchSnapshots');
    axios.get(`${projectUrl}/snapshots`)
      .then((result) => {
        const snapshots = result.data;
        console.log(snapshots);
        dispatch(receiveSnapshots({ payload: { snapshots } }));
      });
  };

const actions = {
  requestTemperaturesAndHumidities,
  requestSnapshots,
};

export default actions;
