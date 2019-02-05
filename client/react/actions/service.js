import { actions, paths } from '../../../common/constants';

export default {
  clearServiceState: () => ({ type: actions.SERVICE_DATA_RESET }),

  createService: values => ({
    [actions.API_CALL]: {
      types: [
        actions.SERVICE_CREATE_REQUEST,
        actions.SERVICE_CREATE_SUCCESS,
        actions.SERVICE_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.SERVICES, values),
    },
  }),

  updateService: (values, id) => ({
    [actions.API_CALL]: {
      types: [
        actions.SERVICE_UPDATE_REQUEST,
        actions.SERVICE_UPDATE_SUCCESS,
        actions.SERVICE_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.v1.SERVICES_ID, id), values),
    },
  }),

  getService: id => ({
    [actions.API_CALL]: {
      types: [
        actions.SERVICE_GET_REQUEST,
        actions.SERVICE_GET_SUCCESS,
        actions.SERVICE_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.v1.SERVICES_ID, id)),
    },
  }),

  removeService: id => ({
    [actions.API_CALL]: {
      types: [
        actions.SERVICE_REMOVE_REQUEST,
        actions.SERVICE_REMOVE_SUCCESS,
        actions.SERVICE_REMOVE_FAILURE,
      ],
      promise: client => client.delete(paths.build(paths.api.v1.SERVICES_ID, id)),
    },
  }),
};
