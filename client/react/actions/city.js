import { actions, paths } from '../../../common/constants';

export default {
  clearCityState: () => ({ type: actions.CITY_DATA_RESET }),

  createCity: values => ({
    [actions.API_CALL]: {
      types: [
        actions.CITY_CREATE_REQUEST,
        actions.CITY_CREATE_SUCCESS,
        actions.CITY_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.CITIES, values),
    },
  }),

  updateCity: (values, id) => ({
    [actions.API_CALL]: {
      types: [
        actions.CITY_UPDATE_REQUEST,
        actions.CITY_UPDATE_SUCCESS,
        actions.CITY_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.v1.CITIES_ID, id), values),
    },
  }),

  getCity: id => ({
    [actions.API_CALL]: {
      types: [
        actions.CITY_GET_REQUEST,
        actions.CITY_GET_SUCCESS,
        actions.CITY_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.v1.CITIES_ID, id)),
    },
  }),
};
