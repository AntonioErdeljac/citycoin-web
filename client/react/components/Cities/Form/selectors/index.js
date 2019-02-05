import { getCodes } from 'country-list';
import { map } from 'lodash';

export default state => ({
  isSubmitting: state.city.isSubmitting,
  hasFailedToSubmit: state.city.hasFailedToSubmit,
  isLoading: state.city.isLoading,
  hasFailedToLoad: state.city.hasFailedToLoad,
  city: state.city.data,
  countryCodeOptions: map(getCodes(), (label, value) => ({ label, value })),
  servicesOptions: map(state.services.data, service => ({ label: service.general.name, value: service._id })),
});
