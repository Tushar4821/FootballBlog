import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Logo, Input } from './index'

function Signup() {
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const create = async (data) => {
  setError("");

  try {
    await authService.createAccount(data); 

    const userData = await authService.getCurrentUser();

    if (userData) {
      dispatch(login(userData));
      navigate("/");
    }
  } catch (err) {
    console.error("Signup failed:", err);
    setError(err.message);
  }
};


  return (
    <div className="min-h-screen bg-[#1A2238] flex items-center justify-center px-4 py-12">
      <div 
        className={`
          w-full max-w-md 
          bg-[#242F4A]/40 backdrop-blur-xl 
          border border-gray-700/50 
          rounded-2xl shadow-2xl 
          overflow-hidden
        `}
      >
        <div className="px-8 pt-10 pb-6 flex flex-col items-center bg-linear-to-b from-[#1E293B]/60 to-transparent">
          <div className="mb-6">
            <Logo width="80px" />
          </div>
          <h2 className="text-3xl font-bold text-gray-100 text-center">
            Create your account
          </h2>
          <p className="mt-3 text-gray-400 text-center text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="px-8 pt-4">
            <p className="text-red-400 text-center text-sm bg-red-950/50 py-3 px-4 rounded-lg border border-red-800/60">
              {error}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="px-8 pb-10 pt-6 space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email"
            )}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters (Appwrite requirement)",
    },
             } )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full py-3.5 mt-2
              bg-linear-to-r from-indigo-600 to-purple-600
              hover:from-indigo-700 hover:to-purple-700
              text-white font-medium
              rounded-lg shadow-lg
              transition-all duration-300
              hover:shadow-indigo-500/30
              disabled:opacity-60 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1A2238]
            `}
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </form>

        <div className="px-8 py-5 border-t border-gray-700/50 text-center text-xs text-gray-500 bg-[#1E293B]/40">
          By signing up, you agree to our Terms & Privacy Policy
        </div>
      </div>
    </div>
  )
}

export default Signup