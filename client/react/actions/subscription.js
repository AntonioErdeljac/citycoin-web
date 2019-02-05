import { actions, paths } from '../../../common/constants';

export default {
  clearSubscriptionState: () => ({ type: actions.SUBSCRIPTION_DATA_RESET }),

  createSubscription: values => ({
    [actions.API_CALL]: {
      types: [
        actions.SUBSCRIPTION_CREATE_REQUEST,
        actions.SUBSCRIPTION_CREATE_SUCCESS,
        actions.SUBSCRIPTION_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.v1.SUBSCRIPTIONS, values),
    },
  }),

  updateSubscription: (values, id) => ({
    [actions.API_CALL]: {
      types: [
        actions.SUBSCRIPTION_UPDATE_REQUEST,
        actions.SUBSCRIPTION_UPDATE_SUCCESS,
        actions.SUBSCRIPTION_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.v1.SUBSCRIPTIONS_ID, id), values),
    },
  }),

  getSubscription: id => ({
    [actions.API_CALL]: {
      types: [
        actions.SUBSCRIPTION_GET_REQUEST,
        actions.SUBSCRIPTION_GET_SUCCESS,
        actions.SUBSCRIPTION_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.v1.SUBSCRIPTIONS_ID, id)),
    },
  }),

  removeSubscription: id => ({
    [actions.API_CALL]: {
      types: [
        actions.SUBSCRIPTION_REMOVE_REQUEST,
        actions.SUBSCRIPTION_REMOVE_SUCCESS,
        actions.SUBSCRIPTION_REMOVE_FAILURE,
      ],
      promise: client => client.delete(paths.build(paths.api.v1.SUBSCRIPTIONS_ID, id)),
    },
  }),
};
