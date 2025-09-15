import { useGetUserByIdQuery } from "../store/auth/authApi";

export default function useUserData() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: User } = useGetUserByIdQuery(user?.id);
  return User;
}
