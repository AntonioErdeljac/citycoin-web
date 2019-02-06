import { map } from 'lodash';

export default state => ({
  isSubmitting: state.user.isSubmitting,
  hasFailedToSubmit: state.user.hasFailedToSubmit || state.services.hasFailedToLoad,
  isLoading: state.user.isLoading || state.services.isLoading,
  hasFailedToLoad: state.user.hasFailedToLoad,
  user: state.user.data,
  servicesOptions: map(state.services.data, service => ({ label: service.general.name, value: service._id })),
});
