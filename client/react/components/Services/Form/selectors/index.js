import { map } from 'lodash';
import capitalize from 'capitalize';

import { _t } from '../../../../../../common/i18n';
import { servicesTypes } from '../../../../../../common/constants';

export default state => ({
  isSubmitting: state.service.isSubmitting,
  hasFailedToSubmit: state.service.hasFailedToSubmit,
  isLoading: state.service.isLoading || state.subscriptions.isLoading,
  hasFailedToLoad: state.service.hasFailedToLoad || state.subscriptions.hasFailedToLoad,
  service: state.service.data,
  servicesTypesOptions: map(servicesTypes, (label, value) => ({ label: capitalize(_t(`serviceTypes.${label}`)), value })),
  subscriptionsOptions: map(state.subscriptions.data, subscription => ({ label: subscription.general.name, value: subscription._id })),
});
