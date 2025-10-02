import useAppContext from "./useAppContext";

const useUser = () => {
  const { auth } = useAppContext();
  console.log(auth);

  return [auth.username , auth.email] as const;
};

export default useUser;
