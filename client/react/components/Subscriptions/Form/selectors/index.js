import { map } from 'lodash';
import capitalize from 'capitalize';

import { _t } from '../../../../../../common/i18n';
import { subscriptionsDurationUnitTypes } from '../../../../../../common/constants';

export default state => ({
  isSubmitting: state.subscription.isSubmitting,
  hasFailedToSubmit: state.subscription.hasFailedToSubmit,
  isLoading: state.subscription.isLoading,
  hasFailedToLoad: state.subscription.hasFailedToLoad,
  subscription: state.subscription.data,
  durationUnitTypesOptions: map(subscriptionsDurationUnitTypes, (label, value) => ({ label: capitalize(_t(`durationUnits.${label}`)), value })),
});
