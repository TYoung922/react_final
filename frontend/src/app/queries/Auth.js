import { Ax_Auth } from "../utils/Axios";
import { useMutation, useQuery } from "react-query";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const loginUser = async (body) => {
  //   const user = `${Ax_Auth}/${"login"}`;
  return await Ax_Auth.post("login", body);
};

const registerUser = async (body) => {
  //   const newUser = `${Ax_Auth}/${"register"}`;
  return await Ax_Auth.post("register", body);
};

const useUser = () =>
  useQuery("user", fetchUser, { refetchOnWindowFocus: false, retry: false });

const useLoginUser = () => useMutation("loginUser", loginUser);
const useRegisterUser = () => useMutation("registerUser", registerUser);

export { useUser, useLoginUser, useRegisterUser };
