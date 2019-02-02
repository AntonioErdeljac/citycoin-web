import { actions } from '../../../../common/constants';

const initialState = {
  isSubmitting: false,
  hasFailedToSubmit: false,
  data: {},
};

const actionMap = {
  [actions.AUTHENTICATION_DATA_RESET]: () => ({ ...initialState }),

  [actions.AUTHENTICATION_LOGIN_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.AUTHENTICATION_LOGIN_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.AUTHENTICATION_LOGIN_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),

  [actions.AUTHENTICATION_REGISTER_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.AUTHENTICATION_REGISTER_SUCCESS]: (state, { result }) => ({
    ...state,
    data: result.data,
    hasFailedToSubmit: false,
    isSubmitting: false,
  }),
  [actions.AUTHENTICATION_REGISTER_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
