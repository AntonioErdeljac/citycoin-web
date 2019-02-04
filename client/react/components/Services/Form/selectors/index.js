export default state => ({
  isSubmitting: state.service.isSubmitting,
  hasFailedToSubmit: state.service.hasFailedToSubmit,
  isLoading: state.service.isLoading,
  hasFailedToLoad: state.service.hasFailedToLoad,
  service: state.service.data,
});
