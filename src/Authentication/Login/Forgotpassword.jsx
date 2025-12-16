import React, { useState } from "react";
import { useLocation} from "react-router";
import { toast } from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const ForgetPassword = () => {
  const { resetPassword , loading , setLoading} = useAuth();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");

  if(loading){
    return <p>Loading...</p>

  }

  const handleReset = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Password reset link sent! Check your Gmail.");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };



  return (
    <div className="flex justify-center items-center min-h-screen p-2">
      <div className="h-[250px] md:w-1/2 w-full mx-auto my-10 p-8 m-2 rounded-2xl shadow-md max-w-4xl border border-[#03045E]">
        <h2 className="text-xl font-bold text-center mb-4 text-[#03045E]">
          Reset Password
        </h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border bg-white border-gray-300 p-2 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-[#24BBDC]"
        />

        <button
          target="_blank"
          onClick={handleReset}
          className="bg-[#03045E] hover:bg-[#03045E] text-white font-semibold my-2 py-2 px-4 w-full rounded-md"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ForgetPassword;
