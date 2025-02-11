export type InventoryItem = {
	name: string,
	category: string,
	stock: string,
	price: string,
	status: string
}

export type Employee = {
	name: string,
	role: string,
	performance: string,
	hours: string,
	status: string
}

export type SidebarItem = {
	icon: any;
	label: string;
};

export type BriefCard = {
	icon: any;
	title: string;
	value: string;
	change: string;
};
