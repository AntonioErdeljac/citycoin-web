export default state => ({
  hasFailedToSubmit: state.authentication.hasFailedToSubmit,
  isSubmitting: state.authentication.isSubmitting,
  user: state.authentication.data,
});
