import { actions } from '../../../../common/constants';

const initialState = {
  isSubmitting: false,
  hasFailedToSubmit: false,
  data: {},
};

const actionMap = {
  [actions.SERVICE_DATA_RESET]: () => ({ ...initialState }),

  [actions.SERVICE_GET_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.SERVICE_GET_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.SERVICE_GET_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),

  [actions.SERVICE_CREATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.SERVICE_CREATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.SERVICE_CREATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),

  [actions.SERVICE_UPDATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.SERVICE_UPDATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.SERVICE_UPDATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
