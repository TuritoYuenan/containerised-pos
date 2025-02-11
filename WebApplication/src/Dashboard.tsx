"use client"

import { useState } from "react"

import { Tabs, TabsContent } from "@/components/ui/tabs"

import Sidebar from "@/components/Sidebar"
import Brief from "@/components/Brief"

import InventoryView from "@/views/InventoryView"
import EmployeeView from "@/views/EmployeeView"
import SalesView from "@/views/SalesView"

import { menuItems, briefItems, inventoryItems, employees, salesPerformanceMetrics } from "@/lib/dummy"

export default function Component() {
	const [activeTab, setActiveTab] = useState("inventory")

	return (
		<div className="flex h-screen bg-gray-100">
			{/* Sidebar */}
			<Sidebar items={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />

			{/* Main Content */}
			<div className="flex-1 overflow-auto p-8">
				<Brief items={briefItems} />

				<Tabs value={activeTab} onValueChange={setActiveTab}>
					<TabsContent value="inventory" className="space-y-4">
						<InventoryView inventoryItems={inventoryItems} />
					</TabsContent>

					<TabsContent value="employees" className="space-y-4">
						<EmployeeView employees={employees} />
					</TabsContent>

					<TabsContent value="sales" className="space-y-4">
						<SalesView metrics={salesPerformanceMetrics} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
