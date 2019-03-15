export default state => ({
  cities: state.cities.data,
  isLoading: state.cities.isLoading,
  hasFailedToLoad: state.cities.hasFailedToLoad,
});
