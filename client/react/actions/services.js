import { actions, paths } from '../../../common/constants';

export default {
  clearServicesState: () => ({ type: actions.SERVICES_DATA_RESET }),

  getServices: filters => ({
    [actions.API_CALL]: {
      types: [
        actions.SERVICES_GET_REQUEST,
        actions.SERVICES_GET_SUCCESS,
        actions.SERVICES_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.v1.SERVICES, { params: filters }),
    },
  }),
};
