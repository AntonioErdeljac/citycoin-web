import { map } from 'lodash';
import capitalize from 'capitalize';

import { _t } from '../../../../../../common/i18n';
import { servicesTypes, subscriptionsDurationUnitTypes } from '../../../../../../common/constants';

export default state => ({
  isSubmitting: state.service.isSubmitting,
  hasFailedToSubmit: state.service.hasFailedToSubmit,
  isLoading: state.service.isLoading,
  hasFailedToLoad: state.service.hasFailedToLoad,
  service: state.service.data,
  servicesTypesOptions: map(servicesTypes, (label, value) => ({ label: capitalize(_t(`serviceTypes.${label}`)), value })),
  subscriptionsDurationUnitTypesOptions: map(subscriptionsDurationUnitTypes, (label, value) => ({ label: capitalize(_t(`durationUnits.${label}`)), value })),
});
