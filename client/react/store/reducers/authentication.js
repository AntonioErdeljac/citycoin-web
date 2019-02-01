const initialState = {
  isSubmitting: false,
  hasFailedToSubmit: false,
};

const actionMap = {

};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
