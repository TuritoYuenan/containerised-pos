import { Button } from "@/components/ui/button";
import { SidebarItem } from "@/lib/types";

export default function ({ items, activeTab, setActiveTab }: { items: SidebarItem[], activeTab: string, setActiveTab: (tab: string) => void }) {
	return (
		<div className="w-64 bg-white shadow-md p-4">
			<h1 className="text-2xl font-bold mb-6">Management Portal</h1>
			<nav className="space-y-2">
				{items.map(({ icon: Icon, label }) => (
					<Button
						key={label}
						variant={activeTab === label.toLowerCase() ? "secondary" : "ghost"}
						className="w-full justify-start"
						onClick={() => setActiveTab(label.toLowerCase())}
					>
						<Icon className="mr-2 h-4 w-4" />
						{label}
					</Button>
				))}
			</nav>
		</div>
	);
}