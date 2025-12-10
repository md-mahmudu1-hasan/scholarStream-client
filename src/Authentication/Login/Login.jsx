import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, googleSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogle = async () => {
    try {
      if (!googleSignIn) return;

      const res = await googleSignIn();

      const userInfo = {
        email: res.user.email,
        name: res.user.displayName,
        photoURL: res.user.photoURL,
      };

      await axiosInstance.post("/users", userInfo);

      navigate(location?.state || "/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1224] to-[#0d1b42] px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4 leading-snug">Login</h1>
          <p className="text-lg opacity-80">
            Start your journey <br /> now with us
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8 w-full">
          <h2 className="text-2xl font-semibold mb-6">Login to your account</h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="your@email.com"
              className="input input-bordered w-full mb-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <label className="block text-sm font-medium mb-1 mt-3">
              Password
            </label>

            <div className="relative mb-2">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer opacity-60"
              >
                <FaEye />
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            <div className="text-xs py-2">
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
            >
              Login
            </button>
          </form>

          <button
            onClick={handleGoogle}
            className="btn w-full bg-blue-50 text-gray-700 border border-gray-200 mb-4"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-600 cursor-pointer">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
