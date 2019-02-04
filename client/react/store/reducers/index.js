import { combineReducers } from 'redux';

import authentication from './authentication';
import cities from './cities';
import city from './city';

export default combineReducers({
  authentication,
  cities,
  city,
});
