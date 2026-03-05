import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import CategoryItem from "../components/CategoryItem";

const categories = [
{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
return (
<div className="relative min-h-screen text-white overflow-hidden scroll-smooth">
<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

{/* Hero Section */}
<motion.div
className="pt-32 pb-16 text-center"
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7 }}
>
<div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
<Sparkles size={11} />
New Season — 2026 Collection
</div>

<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-none">
<span className="block text-white">Dress With</span>
<span className="block bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
Confidence
</span>
</h1>

<p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
Premium men&apos;s fashion for the modern gentleman. Timeless pieces built for quality and style.
</p>

<div className="flex flex-wrap items-center justify-center gap-4">
<a
href="#category"
className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group"
>
Shop Collection
<ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
</a>
</div>

{/* Cool Stats row */}
<div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/5">
{[
{ label: "Premium Products", value: "500+" },
{ label: "Happy Customers", value: "12K+" },
{ label: "Brands Available", value: "40+" },
].map((stat) => (
<div key={stat.label} className="text-center">
<p className="text-2xl font-bold text-white">{stat.value}</p>
<p className="text-xs text-gray-500 tracking-wide mt-0.5">{stat.label}</p>
</div>
))}
</div>
</motion.div>

{/* Categories Section */}
<motion.div
id="category"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7, delay: 0.25 }}
className="pb-16 scroll-mt-20"
>
<div className="flex items-center gap-4 mb-8">
<div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
<h2 className="text-lg font-semibold tracking-[0.22em] text-emerald-400 uppercase px-2">
Shop by Category
</h2>
<div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{categories.map((category) => (
<CategoryItem category={category} key={category.name} />
))}
</div>
</motion.div>

</div>
</div>
);
};

export default HomePage;