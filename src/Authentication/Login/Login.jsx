import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const axiosInstance = useAxios(); 
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useAuth();

  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await signIn(data.email, data.password);
      navigate("/");
      toast.success("Login Success");
    } catch (err) {
      setError(err.message.split("(")[1].split(")")[0]);
    }
  };

  const handleGoogle = () => {
    try {
      if (!googleSignIn) return;

      googleSignIn().then((res) => {
        const userInfo = {
          email: res.user.email,
          name: res.user.displayName,
          photoURL: res.user.photoURL,
        };
        axiosInstance.post("/users", userInfo);
        navigate("/");
        toast.success("Google Sign In Success");
      });
    } catch (err) {
      setError(err.message.split("(")[1].split(")")[0]);
    }
  };

  useEffect(() => {
    if (error) {
      if (error === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (error === "auth/invalid-email") {
        setError("Invalid email address.");
      } else if (error === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(error);
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d1224] to-[#0d1b42] px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        <title>Login</title>
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
              onChange={(e) => setEmail(e.target.value)}
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
                className="absolute right-3 top-3 cursor-pointer opacity-60 z-50"
              >
                <FaEye />
              </span>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mb-2">
                {errors.password.message}
              </p>
            )}

            {error && (
              <p className="text-red-500 pt-4 text-sm -mt-3 mb-3">{error}</p>
            )}

            <div className="text-xs py-2">
              <Link
                state={{ email }}
                className="text-xs pl-1 text-right"
                to="/forget-password"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : (
                "Login"
              )}
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
