import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "@/components/Ui/ui/button";
import { Input } from "../../components/Ui/ui/input";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Music, Play } from "lucide-react";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", formData);
      setIsLoading(false);
      // Redirect to dashboard or home page
      router.push("/");
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Clean Dark Glassmorphism Background with Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient orbs - clean and minimal like the Dribbble design */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-violet-500/15 via-pink-500/8 to-transparent rounded-full blur-2xl"></div>

        {/* Modern Abstract Geometric Elements */}

        {/* Large Floating Circles with Gradient Borders */}
        <div
          className="absolute top-12 left-16 w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent border border-blue-400/20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-32 right-20 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400/15 via-pink-400/8 to-transparent border border-cyan-300/25 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute bottom-20 left-24 w-28 h-28 rounded-full bg-gradient-to-br from-violet-500/12 via-indigo-400/6 to-transparent border border-violet-400/18 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-16 w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/18 via-rose-400/10 to-transparent border border-pink-300/22 animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Abstract Triangle Shapes */}
        <div className="absolute top-20 left-1/3 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-blue-400/20 transform rotate-45"></div>
        <div className="absolute top-40 right-1/4 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-purple-400/25 transform -rotate-30"></div>
        <div className="absolute bottom-24 left-1/4 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[30px] border-b-cyan-400/18 transform rotate-60"></div>
        <div className="absolute bottom-40 right-1/3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-pink-400/22 transform -rotate-45"></div>

        {/* Flowing Curved Lines */}
        <div className="absolute top-1/4 left-1/6 w-40 h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent transform rotate-12 rounded-full"></div>
        <div className="absolute top-1/2 right-1/8 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent transform -rotate-20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/8 w-36 h-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent transform rotate-45 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/6 w-28 h-1 bg-gradient-to-r from-transparent via-pink-400/28 to-transparent transform -rotate-35 rounded-full"></div>

        {/* Organic Blob Shapes */}
        <div
          className="absolute top-1/6 right-1/5 w-24 h-16 bg-gradient-to-br from-indigo-400/15 via-violet-500/8 to-transparent rounded-full transform rotate-12 animate-pulse"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            animationDelay: "2.5s",
          }}
        ></div>
        <div
          className="absolute top-2/3 left-1/5 w-20 h-14 bg-gradient-to-br from-cyan-400/18 via-blue-500/10 to-transparent rounded-full transform -rotate-20 animate-pulse"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 70% 30% 60%",
            animationDelay: "1.5s",
          }}
        ></div>
        <div
          className="absolute bottom-1/6 left-1/3 w-22 h-18 bg-gradient-to-br from-pink-400/20 via-rose-500/12 to-transparent rounded-full transform rotate-30 animate-pulse"
          style={{
            borderRadius: "50% 30% 60% 40% / 50% 60% 40% 30%",
            animationDelay: "3.5s",
          }}
        ></div>

        {/* Geometric Diamond Shapes */}
        <div className="absolute top-1/3 left-1/12 w-16 h-16 bg-gradient-to-br from-white/20 via-blue-400/15 to-transparent transform rotate-45 border border-white/10"></div>
        <div className="absolute top-2/3 right-1/12 w-12 h-12 bg-gradient-to-br from-purple-400/25 via-violet-500/18 to-transparent transform rotate-45 border border-purple-300/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-14 h-14 bg-gradient-to-br from-cyan-400/22 via-cyan-500/16 to-transparent transform rotate-45 border border-cyan-300/25"></div>

        {/* Floating Particles with Glow */}
        <div
          className="absolute top-1/5 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-ping"
          style={{
            animationDelay: "1s",
            boxShadow: "0 0 10px rgba(255,255,255,0.3)",
          }}
        ></div>
        <div
          className="absolute top-3/5 right-1/3 w-2 h-2 bg-blue-400/50 rounded-full animate-ping"
          style={{
            animationDelay: "2s",
            boxShadow: "0 0 8px rgba(59,130,246,0.4)",
          }}
        ></div>
        <div
          className="absolute bottom-1/5 left-1/3 w-2.5 h-2.5 bg-purple-400/45 rounded-full animate-ping"
          style={{
            animationDelay: "3s",
            boxShadow: "0 0 12px rgba(168,85,247,0.35)",
          }}
        ></div>
        <div
          className="absolute bottom-2/5 right-1/2 w-1.5 h-1.5 bg-cyan-400/55 rounded-full animate-ping"
          style={{
            animationDelay: "4s",
            boxShadow: "0 0 6px rgba(34,211,238,0.4)",
          }}
        ></div>

        {/* Abstract Wave Patterns */}
        <div
          className="absolute top-1/4 left-1/2 w-32 h-8 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent rounded-full transform -rotate-12"
          style={{ clipPath: "polygon(0% 20%, 100% 0%, 100% 80%, 0% 100%)" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-28 h-6 bg-gradient-to-r from-transparent via-purple-400/18 to-transparent rounded-full transform rotate-25"
          style={{ clipPath: "polygon(0% 30%, 100% 10%, 100% 90%, 0% 70%)" }}
        ></div>

        {/* Subtle accent dots - minimal and elegant */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full"></div>
        <div className="absolute top-32 right-32 w-1 h-1 bg-blue-400/40 rounded-full"></div>
        <div className="absolute bottom-24 left-32 w-1.5 h-1.5 bg-purple-400/30 rounded-full"></div>
        <div className="absolute bottom-32 right-20 w-1 h-1 bg-cyan-400/40 rounded-full"></div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => router.back()}
          className="mb-8 flex items-center text-grey.200 hover:text-white.200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </motion.button>

        {/* Login Card - Clean Glassmorphism Style */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Clean glassmorphism overlay - inspired by Dribbble design */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/8 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-transparent rounded-2xl"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              variants={itemVariants}
              className="w-20 h-16 flex items-center justify-center mx-auto mb-4"
            >
              <div className="text-white.200 font-bold text-3xl font-1">
                Liveparte
              </div>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold text-white.200 mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p variants={itemVariants} className="text-grey.200">
              Sign in to continue your streaming journey
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-6 relative z-10"
          >
            {/* Email Field */}
            <div>
              <label className="block text-white.200 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red.100 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white.200 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="px-4 py-3 pr-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-grey.200 hover:text-white.200 transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red.100 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-grey.200 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-yellow.100 bg-grey.100/50 border-grey.400/30 rounded focus:ring-yellow.100/20"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <button
                type="button"
                className="text-yellow.100 hover:text-yellow.200 text-sm transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:bg-white/30 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Sign In
                </div>
              )}
            </Button>
          </motion.form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-8 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-grey.400/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-grey.200">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* Social Login */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 relative z-10"
          >
            <Button
              type="button"
              className="bg-grey.100/20 hover:bg-grey.100/30 text-white.200 border border-grey.400/30 py-3 rounded-xl transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              className="bg-grey.100/20 hover:bg-grey.100/30 text-white.200 border border-grey.400/30 py-3 rounded-xl transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </motion.div>

          {/* Sign Up Link */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8 relative z-10"
          >
            <p className="text-grey.200">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/auth/signup")}
                className="text-yellow.100 hover:text-yellow.200 font-semibold transition-colors"
              >
                Sign up
              </button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
