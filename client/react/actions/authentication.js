import { actions, paths } from '../../../common/constants';

export default {
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
};
