import { combineReducers } from 'redux';

import authentication from './authentication';
import cities from './cities';

export default combineReducers({
  authentication,
  cities,
});
