import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader, Scissors } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const { login, loading } = useUserStore();

const handleSubmit = (e) => {
e.preventDefault();
login(email, password);
};

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
<h1 className="text-3xl font-bold text-white mb-1.5">Welcome back</h1>
<p className="text-gray-400 text-sm">Sign in to your ThreadSmith account</p>
</motion.div>

{/* Card */}
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.15 }}
className="bg-gray-900 rounded-2xl border border-white/8 shadow-2xl p-8"
>
<form onSubmit={handleSubmit} className="space-y-5">

{/* Email */}
<div>
<label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">
Email address
</label>
<div className="relative">
<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
<input
id="email"
type="email"
required
value={email}
onChange={(e) => setEmail(e.target.value)}
className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
placeholder="you@example.com"
/>
</div>
</div>

{/* Password */}
<div>
<label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
Password
</label>
<div className="relative">
<Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
<input
id="password"
type="password"
required
value={password}
onChange={(e) => setPassword(e.target.value)}
className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-200"
placeholder="••••••••"
/>
</div>
</div>

{/* Submit */}
<button
type="submit"
disabled={loading}
className="w-full flex items-center justify-center gap-2 py-3 px-6 mt-1 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
>
{loading ? (
<>
<Loader className="h-4 w-4 animate-spin" />
Signing in...
</>
) : (
<>
<LogIn className="h-4 w-4" />
Sign In
</>
)}
</button>
</form>

<div className="mt-6 pt-6 border-t border-white/5 text-center">
<p className="text-sm text-gray-400">
Do not have an account?{" "}
<Link to="/signup" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
Create account <ArrowRight className="h-3.5 w-3.5" />
</Link>
</p>
</div>
</motion.div>

</div>
</div>
);
};

export default LoginPage;