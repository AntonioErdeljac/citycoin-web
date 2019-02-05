import { actions } from '../../../../common/constants';

const initialState = {
  isLoading: false,
  hasFailedToLoad: false,
  data: [],
};

const actionMap = {
  [actions.SUBSCRIPTIONS_DATA_RESET]: () => ({ ...initialState }),

  [actions.SUBSCRIPTIONS_GET_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.SUBSCRIPTIONS_GET_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data.data,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.SUBSCRIPTIONS_GET_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
