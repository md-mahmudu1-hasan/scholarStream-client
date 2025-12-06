import { use } from "react";
import { AuthContext } from "../Authentication/AuthContext/AuthContext";


const useAuth = () => {
  const authinfo = use(AuthContext);
  return authinfo;
};
export default useAuth;
