export default state => ({
  isSubmitting: state.city.isSubmitting,
  hasFailedToSubmit: state.city.hasFailedToSubmit,
  isLoading: state.city.isLoading,
  hasFailedToLoad: state.city.hasFailedToLoad,
  city: state.city.data,
});
