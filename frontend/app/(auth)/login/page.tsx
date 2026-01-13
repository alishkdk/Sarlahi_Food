'use client'

import axios from "axios";
import { Formik } from "formik";
import Link from "next/link"
import { useRouter } from "next/navigation";
import * as yup from "yup"

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (values: any) => {
    try {
      const { data } = await axios.post(
        "https://fakestoreapi.com/auth/login",
        values
      );

      if (data.token) {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Food background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
          <h1 className="text-4xl font-bold mb-4">Sarlahi Food 🍔</h1>
          <p className="text-lg max-w-md opacity-90">
            Order delicious food from nearby hotels and get it delivered fast.
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-1">Login to your account</p>
          </div>

          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="abc"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.username && touched.username && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Login
                </button>
              </form>
            )}
          </Formik>

          <div className="flex justify-between text-sm text-gray-500 mt-5">
            <Link href="/forgot" className="hover:underline">
              Forgot password?
            </Link>
            <Link
              href="/signup"
              className="text-green-600 hover:underline font-medium"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
