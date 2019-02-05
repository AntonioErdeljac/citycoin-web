import { combineReducers } from 'redux';

import authentication from './authentication';
import cities from './cities';
import city from './city';
import service from './service';
import services from './services';
import subscription from './subscription';
import subscriptions from './subscriptions';

export default combineReducers({
  authentication,
  cities,
  city,
  service,
  services,
  subscription,
  subscriptions,
});
