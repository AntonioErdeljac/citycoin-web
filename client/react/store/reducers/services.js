import { actions } from '../../../../common/constants';

const initialState = {
  data: [],
  hasFailedToLoad: false,
  isLoading: false,
};

const actionMap = {
  [actions.SERVICES_DATA_RESET]: () => ({ ...initialState }),

  [actions.SERVICES_GET_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.SERVICES_GET_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data.data,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.SERVICES_GET_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
