import { Box, Users, DollarSign, Package, ShoppingCart } from "lucide-react";
import { SidebarItem, BriefCard, InventoryItem, Employee } from "./types";

export const menuItems: SidebarItem[] = [
	{ icon: Box, label: "Inventory" },
	{ icon: Users, label: "Employees" },
	{ icon: DollarSign, label: "Sales" },
];

export const briefItems: BriefCard[] = [
	{ title: "Total Revenue", icon: DollarSign, value: "$45,231.89", change: "+20.1%" },
	{ title: "Inventory Value", icon: Package, value: "$12,234.59", change: "-5.2%" },
	{ title: "Total Orders", icon: ShoppingCart, value: "2,345", change: "+8.1%" },
	{ title: "Active Staff", icon: Users, value: "12", change: "0%" },
];

export const inventoryItems: InventoryItem[] = [
	{ name: "Premium Coffee Beans", category: "Beverages", stock: "458 units", price: "$24.99", status: "In Stock" },
	{ name: "Organic Milk", category: "Beverages", stock: "89 units", price: "$4.99", status: "Low Stock" },
	{ name: "Paper Cups", category: "Supplies", stock: "1,200 units", price: "$0.15", status: "In Stock" },
];

export const employees: Employee[] = [
	{ name: "Sarah Johnson", role: "Server", performance: "98%", hours: "32/40", status: "Active" },
	{ name: "Michael Chen", role: "Kitchen", performance: "95%", hours: "38/40", status: "Break" },
	{ name: "Emily Davis", role: "Manager", performance: "97%", hours: "45/40", status: "Active" },
];

export const salesPerformanceMetrics = [
	{
		title: "Top Selling Items",
		items: [
			{ name: "Espresso", value: "342 sold" },
			{ name: "Latte", value: "289 sold" },
			{ name: "Croissant", value: "245 sold" },
		],
	},
	{
		title: "Revenue by Category",
		items: [
			{ name: "Beverages", value: "$12,456" },
			{ name: "Food", value: "$8,234" },
			{ name: "Desserts", value: "$4,567" },
		],
	},
	{
		title: "Key Metrics",
		items: [
			{ name: "Average Order Value", value: "$23.45" },
			{ name: "Customer Retention", value: "68%" },
			{ name: "Net Profit Margin", value: "22%" },
		],
	},
]
