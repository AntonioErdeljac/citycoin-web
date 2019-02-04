import { actions } from '../../../../common/constants';

const initialState = {
  isSubmitting: false,
  hasFailedToSubmit: false,
  data: {},
};

const actionMap = {
  [actions.CITY_DATA_RESET]: () => ({ ...initialState }),

  [actions.CITY_GET_REQUEST]: state => ({ ...state, isLoading: true, hasFailedToLoad: false }),
  [actions.CITY_GET_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToLoad: false,
    isLoading: false,
  }),
  [actions.CITY_GET_FAILURE]: state => ({ ...state, isLoading: false, hasFailedToLoad: true }),

  [actions.CITY_CREATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.CITY_CREATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.CITY_CREATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),

  [actions.CITY_UPDATE_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.CITY_UPDATE_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.CITY_UPDATE_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
