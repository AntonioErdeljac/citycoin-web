import { combineReducers } from 'redux';

import authentication from './authentication';
import cities from './cities';
import city from './city';
import service from './service';
import services from './services';

export default combineReducers({
  authentication,
  cities,
  city,
  service,
  services,
});
