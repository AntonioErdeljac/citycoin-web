import axios from 'axios';

import { actions } from '../../../common/constants';

export default () => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const callAPIAction = action[actions.API_CALL];

  if (typeof callAPIAction === 'undefined' || !callAPIAction.promise) {
    return next(action);
  }

  const { promise, types, ...rest } = callAPIAction;
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...rest, type: REQUEST });

  return promise(axios.create(), dispatch)
    .then(
      result => next({ ...rest, result, type: SUCCESS }),
      (error) => {
        next({ ...rest, error, type: FAILURE });

        return Promise.reject(error);
      },
    );
};
