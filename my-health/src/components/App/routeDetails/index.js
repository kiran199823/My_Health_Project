import { useLocation } from 'react-router-dom';

const useRouteDetails = () => {
  const routes = useLocation();
  const { pathname, search, state } = routes;
  const queryParams = new URLSearchParams(search);

  return {
    pathname,
    queryParams,
    state
  };
};

export default useRouteDetails;
