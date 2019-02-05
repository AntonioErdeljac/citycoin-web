import { actions, paths } from '../../../common/constants';

export default {
  clearSubscriptionsState: () => ({ type: actions.SUBSCRIPTIONS_DATA_RESET }),

  getSubscriptions: filters => ({
    [actions.API_CALL]: {
      types: [
        actions.SUBSCRIPTIONS_GET_REQUEST,
        actions.SUBSCRIPTIONS_GET_SUCCESS,
        actions.SUBSCRIPTIONS_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.v1.SUBSCRIPTIONS, { params: filters }),
    },
  }),
};
