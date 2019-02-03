import { actions, paths } from '../../../common/constants';

export default {
  clearCitiesState: () => ({ type: actions.CITIES_DATA_RESET }),

  getCities: filters => ({
    [actions.API_CALL]: {
      types: [
        actions.CITIES_GET_REQUEST,
        actions.CITIES_GET_SUCCESS,
        actions.CITIES_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.v1.CITIES, { params: filters }),
    },
  }),
};
