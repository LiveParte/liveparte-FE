import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "../../Ui/ui/input";
import { Button } from "../../Ui/ui/button";
import Cookies from "js-cookie";
import { register as apiRegister } from "@/api/auth";
import { useStore } from "@/Context/Zustand";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const setAuthenticated = (useStore as any)((s: any) => s.setAuthenticated);
  const setUser = (useStore as any)((s: any) => s.setUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (mode === "signup") {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.username.trim())
        newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (mode === "signup") {
      const pass = formData.password;
      const rules = [
        { test: /.{8,}/, msg: "At least 8 characters" },
        { test: /[A-Z]/, msg: "At least one uppercase letter" },
        { test: /[a-z]/, msg: "At least one lowercase letter" },
        { test: /\d/, msg: "At least one number" },
        { test: /[^A-Za-z0-9]/, msg: "At least one special character" },
      ];
      const failed = rules.find((r) => !r.test.test(pass));
      if (failed) newErrors.password = failed.msg;
    }

    if (mode === "signup") {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (mode === "signup") {
        const payload = {
          email: formData.email.trim(),
          username: formData.username.trim(),
          fullName: formData.fullName.trim(),
          password: formData.password,
          isGoogle: false,
        };
        const res: any = await apiRegister(payload as any);
        const accessToken = res?.accessToken;
        const user = res?.user;
        if (accessToken) {
          Cookies.set("access_token", accessToken, { sameSite: "lax" });
        }
        if (user) {
          setUser(user);
          setAuthenticated(true);
        }
        onClose();
      } else {
        // TODO: implement login against /auth/login
        await new Promise((resolve) => setTimeout(resolve, 800));
        onClose();
      }
    } catch (error) {
      console.error(`${mode} failed:`, error);
      setErrors((prev) => ({ ...prev, form: "Registration failed" }));
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setErrors({});
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ minHeight: "100vh" }}
        >
          {/* Simple Clean Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content - Perfectly Centered */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{
              type: "spring",
              duration: 0.6,
              bounce: 0.3,
            }}
            className="relative w-full max-w-md max-h-[90vh] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl overflow-y-auto overflow-x-hidden z-10 my-4"
          >
            {/* Clean glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/8 rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-transparent rounded-2xl"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <motion.div
                  variants={itemVariants}
                  className="w-20 h-12 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4"
                >
                  <div className="text-white.200 font-bold text-2xl sm:text-3xl font-1">
                    Liveparte
                  </div>
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-white.200 text-xl sm:text-2xl font-bold mb-2"
                >
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-grey.200 text-sm sm:text-base"
                >
                  {mode === "login"
                    ? "Sign in to continue your streaming journey"
                    : "Create your account and start your streaming journey"}
                </motion.p>
              </div>

              {/* Form */}
              <motion.form
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-6"
              >
                {mode === "signup" && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-white.200 text-xs sm:text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                    />
                    {errors.fullName && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red.100 text-xs sm:text-sm mt-1"
                      >
                        {errors.fullName}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {mode === "signup" && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-white.200 text-xs sm:text-sm font-medium mb-2">
                      Username
                    </label>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="yourusername"
                      className="px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                    />
                    {errors.username && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red.100 text-xs sm:text-sm mt-1"
                      >
                        {errors.username}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Email Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-white.200 text-xs sm:text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={
                      mode === "login" ? "Enter your email" : "john@example.com"
                    }
                    className="px-3 py-2 sm:px-4 sm:py-3 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red.100 text-xs sm:text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants}>
                  <label className="block text-white.200 text-xs sm:text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={
                        mode === "login"
                          ? "Enter your password"
                          : "Create a strong password"
                      }
                      className="px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
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
                      className="text-red.100 text-xs sm:text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Confirm Password Field (Signup only) */}
                {mode === "signup" && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-white.200 text-xs sm:text-sm font-medium mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        className="px-3 py-2 sm:px-4 sm:py-3 pr-10 sm:pr-12 bg-white/5 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-white/60 focus:border-white/40 focus:ring-white/20 rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red.100 text-xs sm:text-sm mt-1"
                      >
                        {errors.confirmPassword}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* Remember Me & Forgot Password (Login only) */}
                {mode === "login" && (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between text-xs sm:text-sm"
                  >
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow.100 bg-grey.100/50 border-grey.400/30 rounded focus:ring-yellow.100/20"
                      />
                      <span className="ml-2 text-grey.200">Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="text-yellow.100 hover:text-yellow.200 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </motion.div>
                )}

                {/* Terms and Conditions (Signup only) */}
                {mode === "signup" && (
                  <motion.div
                    variants={itemVariants}
                    className="flex items-start text-xs sm:text-sm"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-yellow.100 bg-grey.100/50 border-grey.400/30 rounded focus:ring-yellow.100/20 mt-1"
                    />
                    <span className="ml-2 text-grey.200">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-yellow.100 hover:text-yellow.200"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-yellow.100 hover:text-yellow.200"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-xl transition-all duration-300 hover:bg-white/30 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        {mode === "login"
                          ? "Signing in..."
                          : "Creating account..."}
                      </div>
                    ) : mode === "login" ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                  {errors.form && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red.100 text-xs sm:text-sm mt-2 text-center"
                    >
                      {errors.form}
                    </motion.p>
                  )}
                </motion.div>

                {/* Divider */}
                <motion.div variants={itemVariants} className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-grey.400/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm">
                    <span className="px-2 bg-transparent text-grey.200">
                      Or continue with
                    </span>
                  </div>
                </motion.div>

                {/* Social Login */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-2 sm:gap-3"
                >
                  <Button
                    type="button"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-all duration-300"
                  >
                    Google
                  </Button>
                  <Button
                    type="button"
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2 sm:py-3 text-xs sm:text-sm rounded-xl transition-all duration-300"
                  >
                    Apple
                  </Button>
                </motion.div>

                {/* Switch Mode */}
                <motion.div
                  variants={itemVariants}
                  className="text-center text-xs sm:text-sm"
                >
                  <span className="text-grey.200">
                    {mode === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"}{" "}
                  </span>
                  <button
                    type="button"
                    onClick={switchMode}
                    className="text-yellow.100 hover:text-yellow.200 font-medium transition-colors"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
