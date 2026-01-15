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

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();

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

  // Demo Credentials autofill
  const fillDemoCredentials = (type) => {
    if (type === "user") {
      setValue("email", "user@gmail.com");
      setValue("password", "User%%&&1232");
    } else if (type === "admin") {
      setValue("email", "admin11@gmail.com");
      setValue("password", "Admin%%&&1232");
    } else if (type === "moderator") {
      setValue("email", "moderator@gmail.com");
      setValue("password", "Modarator%%&&1232");
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-17 justify-center bg-gradient-to-br from-[#0d1224] to-[#0d1b42] px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        <title>Login</title>

        {/* LEFT TEXT */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-snug">
            Login
          </h1>
          <p className="text-base md:text-lg opacity-80">
            Start your journey <br className="hidden md:block" /> now with us
          </p>

          {/* Demo Buttons */}
          <div className="mt-6 flex flex-col gap-2">
            <button onClick={() => fillDemoCredentials("user")} className="btn bg-blue-500 text-white hover:bg-blue-600">
              Fill User Demo
            </button>
            <button onClick={() => fillDemoCredentials("admin")} className="btn bg-green-500 text-white hover:bg-green-600">
              Fill Admin Demo
            </button>
            <button onClick={() => fillDemoCredentials("moderator")} className="btn bg-purple-500 text-white hover:bg-purple-600">
              Fill Moderator Demo
            </button>
          </div>
        </div>

        {/* FORM CARD */}
        <div className="bg-white dark:bg-[#111827] text-gray-900 dark:text-white shadow-xl rounded-xl p-6 md:p-8 w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Login to your account
          </h2>

          <form onSubmit={handleSubmit(handleLogin)}>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="your@email.com"
              className="input w-full mb-2 bg-gray-100 dark:bg-[#1f2933] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label className="block text-sm font-medium mb-1 mt-3">Password</label>
            <div className="relative mb-2">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                placeholder="Enter your password"
                className="input w-full bg-gray-100 dark:bg-[#1f2933] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600"
              />
              <span onClick={() => setShowPass(!showPass)} className="absolute right-3 top-3 cursor-pointer opacity-70">
                <FaEye />
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="text-xs py-2 text-right">
              <Link state={{ email: "" }} className="text-blue-400 hover:underline" to="/forget-password">
                Forgot Password?
              </Link>
            </div>

            <button className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mb-3" disabled={isSubmitting}>
              {isSubmitting ? <span className="loading loading-spinner"></span> : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogle}
            className="btn w-full mb-4 bg-gray-100 dark:bg-[#1f2933] text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
