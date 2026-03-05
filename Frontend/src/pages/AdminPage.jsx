import { BarChart2, PlusCircle, ShoppingBag, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
{ id: "create", label: "Create Product", icon: PlusCircle },
{ id: "products", label: "Products", icon: ShoppingBag },
{ id: "analytics", label: "Analytics", icon: BarChart2 },
];

const AdminPage = () => {
const [activeTab, setActiveTab] = useState("create");
const { fetchAllProducts } = useProductStore();

useEffect(() => {
fetchAllProducts();
}, [fetchAllProducts]);

return (
<div className="min-h-screen relative overflow-hidden">
<div className="relative z-10 container mx-auto px-4 py-24 max-w-6xl">

{/* Header */}
<motion.div
className="flex items-center gap-3 mb-10"
initial={{ opacity: 0, y: -20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
>
<div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
<LayoutDashboard size={19} className="text-white" />
</div>
<div>
<h1 className="text-2xl font-bold text-white leading-tight">Admin Dashboard</h1>
<p className="text-xs text-gray-500 tracking-wide mt-0.5">Manage your store</p>
</div>
</motion.div>

{/* Tab Bar */}
<motion.div
className="flex gap-1 p-1 bg-gray-900 border border-white/5 rounded-2xl mb-8 w-fit"
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
>
{tabs.map((tab) => (
<button
key={tab.id}
onClick={() => setActiveTab(tab.id)}
className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
activeTab === tab.id
? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
: "text-gray-400 hover:text-white hover:bg-white/5"
}`}
>
<tab.icon size={15} />
{tab.label}
</button>
))}
</motion.div>

{/* Tab Content */}
<motion.div
key={activeTab}
initial={{ opacity: 0, y: 8 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
>
{activeTab === "create" && <CreateProductForm />}
{activeTab === "products" && <ProductsList />}
{activeTab === "analytics" && <AnalyticsTab />}
</motion.div>

</div>
</div>
);
};

export default AdminPage;