import { actions } from '../../../../common/constants';

const initialState = {
  data: {},
  hasFailedToLoad: false,
  hasFailedToSubmit: false,
  isLoading: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.SUBSCRIPTION_DATA_RESET]: () => ({ ...initialState }),

  [actions.SUBSCRIPTION_GET_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.SUBSCRIPTION_GET_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.SUBSCRIPTION_GET_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),

  [actions.SUBSCRIPTION_REMOVE_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.SUBSCRIPTION_REMOVE_SUCCESS]: state => ({
    ...state,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.SUBSCRIPTION_REMOVE_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),

  [actions.SUBSCRIPTION_CREATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.SUBSCRIPTION_CREATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.SUBSCRIPTION_CREATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),

  [actions.SUBSCRIPTION_UPDATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.SUBSCRIPTION_UPDATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.SUBSCRIPTION_UPDATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
