"use client";
import Link from "next/link";
import { loginUpAction } from "@/lib/actions/auth";
import { useActionState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";

const initialState: {
  message: string;
  errors?: {
    username?: string[];
    email?: string[];
    phone?: string[];
    password?: string[];
    confirmPassword?: string[];
    general?: string;
  };
} = { message: "" };

export default function LoginComponent() {
  const [state, formAction, isPending] = useActionState(
    loginUpAction,
    initialState
  );

  return (
    <div className="flex flex-col items-center justify-center mt-4 ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white text-center">
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="mt-2">Enter your details to log in to your account</p>
          </div>

          {state.errors?.general && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mx-6 mt-4 text-red-700 text-sm">
              {state.errors.general}
            </div>
          )}

          <form action={formAction} className="p-6 space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4 py-3"
                placeholder="example@email.com"
              />
              {state.errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4 py-3"
                placeholder="********"
              />
              {state.errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 outline-none focus:ring-blue-300"
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="mr-2 text-sm text-gray-900 mx-2"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>

            <p className="text-sm text-center text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/signup"
                id="show-signup"
                className="text-blue-600 hover:underline font-medium"
              >
                Create an account
              </Link>
            </p>
          </form>

          <div className="p-6 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-center space-x-4">
              <span className="w-12 h-px bg-gray-300"></span>
              <span className="text-gray-500">Or login with</span>
              <span className="w-12 h-px bg-gray-300"></span>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                <FaGoogle className="fab fa-google text-red-500 text-xl" />
              </button>
              <button className="p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                <FaFacebook className="fab fa-facebook text-blue-600 text-xl" />
              </button>
              <button className="p-2 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50">
                <CiTwitter className="fab fa-twitter text-blue-400 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
