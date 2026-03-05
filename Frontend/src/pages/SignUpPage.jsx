import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader, Scissors } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, loading } = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  const fields = [
    {
      id: "name",
      label: "Full name",
      type: "text",
      icon: User,
      value: formData.name,
      placeholder: "John Doe",
      onChange: (v) => setFormData({ ...formData, name: v }),
    },
    {
      id: "email",
      label: "Email address",
      type: "email",
      icon: Mail,
      value: formData.email,
      placeholder: "you@example.com",
      onChange: (v) => setFormData({ ...formData, email: v }),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      icon: Lock,
      value: formData.password,
      placeholder: "Min. 8 characters",
      onChange: (v) => setFormData({ ...formData, password: v }),
    },
    {
      id: "confirmPassword",
      label: "Confirm password",
      type: "password",
      icon: Lock,
      value: formData.confirmPassword,
      placeholder: "Repeat your password",
      onChange: (v) => setFormData({ ...formData, confirmPassword: v }),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">

        {/* Brand mark */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl shadow-xl shadow-emerald-500/30 mb-5">
            <Scissors size={24} className="text-white" strokeWidth={2.2} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1.5">Create an account</h1>
          <p className="text-gray-400 text-sm">Join ThreadSmith and shop the latest collection</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-gray-900 rounded-2xl border border-white/8 shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map(({ id, label, type, icon: Icon, value, placeholder, onChange }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5">
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                  <input
                    id={id}
                    type={type}
                    required
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
                    placeholder={placeholder}
                  />
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 mt-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
                Sign in <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default SignUpPage;