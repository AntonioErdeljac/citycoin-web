export default state => ({
  services: state.services.data,
  isLoading: state.services.isLoading,
  hasFailedToLoad: state.services.hasFailedToLoad,
});
