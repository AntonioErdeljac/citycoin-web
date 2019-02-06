export default state => ({
  users: state.users.data,
  isLoading: state.users.isLoading,
  hasFailedToLoad: state.users.hasFailedToLoad,
});
