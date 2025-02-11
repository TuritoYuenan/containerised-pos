import { Button } from "@/components/ui/button";
import { SidebarItem } from "@/lib/types";

function Logo() {
	return <h1 className="text-2xl font-bold mb-6">Containerised POS Management</h1>;
}

export default function (props: { items: SidebarItem[], activeTab: string, setActiveTab: (tab: string) => void }) {
	return (
		<div className="w-64 bg-white shadow-md p-4">
			<Logo />
			<nav className="space-y-2">
				{props.items.map(({ icon: Icon, label }) => (
					<Button
						key={label}
						variant={props.activeTab === label.toLowerCase() ? "secondary" : "ghost"}
						className="w-full justify-start"
						onClick={() => props.setActiveTab(label.toLowerCase())}
					>
						<Icon className="mr-1" />
						{label}
					</Button>
				))}
			</nav>
		</div>
	);
}
