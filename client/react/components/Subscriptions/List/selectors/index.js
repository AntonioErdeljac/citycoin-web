export default state => ({
  subscriptions: state.subscriptions.data,
  isLoading: state.subscriptions.isLoading,
  hasFailedToLoad: state.subscriptions.hasFailedToLoad,
});
