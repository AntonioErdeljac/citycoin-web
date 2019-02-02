import { actions, paths } from '../../../common/constants';

export default {
  clearAuthenticationState: () => ({ type: actions.AUTHENTICATION_DATA_RESET }),

  login: values => ({
    [actions.API_CALL]: {
      types: [
        actions.AUTHENTICATION_LOGIN_REQUEST,
        actions.AUTHENTICATION_LOGIN_SUCCESS,
        actions.AUTHENTICATION_LOGIN_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.AUTHENTICATION_LOGIN, values),
    },
  }),

  register: values => ({
    [actions.API_CALL]: {
      types: [
        actions.AUTHENTICATION_REGISTER_REQUEST,
        actions.AUTHENTICATION_REGISTER_SUCCESS,
        actions.AUTHENTICATION_REGISTER_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.AUTHENTICATION_REGISTRATION, values),
    },
  }),
};
