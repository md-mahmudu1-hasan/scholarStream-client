import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { signIn, googleSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handleGoogle = async () => {
    try {
      if (!googleSignIn) return;
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0d1224] to-[#0d1b42] px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4 leading-snug">Login page</h1>
          <p className="text-lg opacity-80">
            Start your journey <br /> now with us
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-8 w-full">
          <h2 className="text-2xl font-semibold mb-6">Create an account</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="your@email.com"
              className="input input-bordered w-full mb-4"
            />

            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative mb-4">
              <input
                type={showPass ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="Enter your password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer{" "}
                </p>
              )}
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer opacity-60 z-20"
              >
                <FaEye />
              </span>
            </div>
            <div className="text-xs py-2">
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mb-3">
              Create account
            </button>
          </form>
          <button onClick={handleGoogle} className="btn w-full bg-blue-50 text-gray-700 border border-gray-200 mb-4">
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a className="text-blue-600 cursor-pointer">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
