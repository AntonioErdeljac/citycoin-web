import { actions, paths } from '../../../common/constants';

export default {
  clearUserState: () => ({ type: actions.USER_DATA_RESET }),

  createUser: values => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_CREATE_REQUEST,
        actions.USER_CREATE_SUCCESS,
        actions.USER_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.USERS, values),
    },
  }),

  updateUser: (values, id) => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_UPDATE_REQUEST,
        actions.USER_UPDATE_SUCCESS,
        actions.USER_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.v1.USERS_ID, id), values),
    },
  }),

  getUser: id => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_GET_REQUEST,
        actions.USER_GET_SUCCESS,
        actions.USER_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.v1.USERS_ID, id)),
    },
  }),

  removeUser: id => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_REMOVE_REQUEST,
        actions.USER_REMOVE_SUCCESS,
        actions.USER_REMOVE_FAILURE,
      ],
      promise: client => client.delete(paths.build(paths.api.v1.USERS_ID, id)),
    },
  }),
};
