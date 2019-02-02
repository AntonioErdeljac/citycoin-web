import { actions } from '../../../../common/constants';

const initialState = {
  isSubmitting: false,
  hasFailedToSubmit: false,
};

const actionMap = {
  [actions.AUTHENTICATION_LOGIN_REQUEST]: state => ({ ...state, isSubmitting: true, hasFailedToSubmit: false }),
  [actions.AUTHENTICATION_LOGIN_SUCCESS]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: false }),
  [actions.AUTHENTICATION_LOGIN_FAILURE]: state => ({ ...state, isSubmitting: false, hasFailedToSubmit: true }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
