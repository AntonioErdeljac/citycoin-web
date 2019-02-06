import { actions, paths } from '../../../common/constants';

export default {
  clearUsersState: () => ({ type: actions.USERS_DATA_RESET }),

  getUsers: filters => ({
    [actions.API_CALL]: {
      types: [
        actions.USERS_GET_REQUEST,
        actions.USERS_GET_SUCCESS,
        actions.USERS_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.v1.USERS, { params: filters }),
    },
  }),
};
