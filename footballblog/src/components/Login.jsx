import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [error, setError] = useState("")

  const loginHandler = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          navigate("/")
        }
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#1A2238] flex items-center justify-center px-4 py-12">
      <div 
        className={`
          w-full max-w-md 
          bg-[#242F4A]/40 backdrop-blur-xl 
          border border-gray-700/50 
          rounded-2xl shadow-2xl 
          overflow-hidden
          transition-all duration-300
        `}
      >
       
        <div className="px-8 pt-10 pb-6 flex flex-col items-center bg-linear-to-b from-[#1E293B]/60 to-transparent">
          <div className="mb-6">
            <Logo width="80px" /> 
          </div>
          <h2 className="text-3xl font-bold text-gray-100 text-center">
            Welcome back
          </h2>
          <p className="mt-3 text-gray-400 text-center text-base">
            Log in to continue your journey
          </p>
        </div>

        
        {error && (
          <div className="px-8 pt-2">
            <p className="text-red-400 text-center text-sm bg-red-950/40 py-2.5 px-4 rounded-lg border border-red-800/50">
              {error}
            </p>
          </div>
        )}

        
        <form 
          onSubmit={handleSubmit(loginHandler)} 
          className="px-8 pb-10 pt-6 space-y-6"
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Please enter a valid email address",
              }
            })}
          />

          <div className="space-y-2">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                }
              })}
            />

            
            <div className="flex justify-end">
              <Link
                to="/forgot-password" 
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className={`
              w-full py-3.5 
              bg-linear-to-r from-indigo-600 to-purple-600 
              hover:from-indigo-700 hover:to-purple-700 
              text-white font-medium 
              rounded-lg shadow-lg 
              transition-all duration-300 
              hover:shadow-indigo-500/30 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#1A2238]
            `}
          >
            Log In
          </Button>

        
          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-indigo-400 font-medium hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>

        
        <div className="px-8 py-5 border-t border-gray-700/50 text-center text-xs text-gray-500 bg-[#1E293B]/40">
          Secure login powered by Appwrite
        </div>
      </div>
    </div>
  )
}

export default Login