import { QueryClient } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

const AXIOS_AUTH_URL = "http://localhost:4000/api/auth";
const AXIOS_YODELS_URL = "http://localhost:4000/api/yodels";
const AXIOS_FOLLOW_URL = "http://localhost:4000/api/user";

export { AXIOS_AUTH_URL, AXIOS_YODELS_URL, AXIOS_FOLLOW_URL, queryClient };

// API_BASE_AUTH="http://localhost:4000/api/auth"
// API_BASE_YODEL="http://localhost:4000/api/yodels"
// API_BASE_FOLLOW="api/user"
