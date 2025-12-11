import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Utilities/firebase.init";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [error, seterror] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { createUser, googleSignIn, setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, photoURL, password } = data;

    try {
      if (!createUser) return;

      // create user
      await createUser(email, password).then((res) => {
        setUser({ ...res.user, displayName: name, photoURL: photoURL });
        toast.success("User Created Successfully");
      });

      // update profile
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL || undefined,
        });

        // save to database
        await axiosInstance.post("/users", {
          name,
          email,
          photoURL,
        });
      }

      reset();
      navigate("/");
    } catch (err) {
      seterror(err.message.split("(")[1].split(")")[0]);
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
        toast.success("Google Sign In Success");
        navigate("/");
      });
    } catch (err) {}
  };

  useEffect(() => {
    if (error) {
      if (error === "auth/email-already-in-use") {
        toast.error("This email is already registered.");
      } else if (error === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error === "auth/weak-password") {
        toast.error("Password is too weak.");
      } else {
        toast.error(error);
      }
    }
  }, [error]);

  return (
    <div className="min-h-screen mt-17 flex items-center justify-center bg-gradient-to-br from-[#0d1224] to-[#0d1b42] px-4">
      <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl w-full">
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4 leading-snug">
            Create Account
          </h1>
          <p className="text-lg opacity-80">
            Start your journey <br /> now with us
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-xl rounded-xl p-8 w-full"
        >
          <h2 className="text-2xl font-semibold mb-6">Sign up</h2>

          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          <div className="h-3" />

          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="you@email.com"
            className="input input-bordered w-full"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /[^\s@]+@[^\s@]+\.[^\s@]+/,
                message: "Provide a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          <div className="h-3" />

          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            type="text"
            placeholder="https://your-photo-url.com"
            className="input input-bordered w-full"
            {...register("photoURL", {
              pattern: {
                value: /^(https?:\/\/).+/i,
                message: "Provide a valid URL",
              },
            })}
          />
          {errors.photoURL && (
            <p className="text-red-500 text-sm mt-1">
              {errors.photoURL.message}
            </p>
          )}

          <div className="h-3" />

          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative mb-4">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                  message:
                    "Password must include uppercase, lowercase, number & special character",
                },
              })}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute z-50 right-3 top-3 cursor-pointer opacity-60"
            >
              <FaEye />
            </span>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm -mt-3 mb-3">
              {errors.password.message}
            </p>
          )}
          {error && <p className="text-red-500 text-sm -mt-3 mb-3">{error}</p>}

          <button
            type="submit"
            className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
          >
            Create account
          </button>

          <button
            type="button"
            onClick={handleGoogle}
            className="btn w-full bg-blue-50 text-gray-700 border border-gray-200 mb-4"
          >
            <FcGoogle size={22} /> Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 cursor-pointer">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
