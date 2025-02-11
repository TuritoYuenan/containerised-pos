import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table"

import SearchBar from "@/components/SearchBar"
import { InventoryItem } from "@/lib/types"

function ActionBar() {
	return <div className="flex justify-between">
		<div className="flex gap-2">
			<SearchBar subject="inventory" />
			<Select defaultValue="all">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectItem value="all">All Categories</SelectItem>
					<SelectItem value="food">Food</SelectItem>
					<SelectItem value="beverages">Beverages</SelectItem>
					<SelectItem value="supplies">Supplies</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<Button className="rounded bg-black text-white hover:text-black">
			<Plus className="mr-2 h-4 w-4" />
			Add Item
		</Button>
	</div>
}

function TableView(props: { rows: InventoryItem[] }) {
	return <Card>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Item Name</TableHead>
					<TableHead>Category</TableHead>
					<TableHead>Stock</TableHead>
					<TableHead>Unit Price</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.rows.map((item, index) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{item.name}</TableCell>
						<TableCell>{item.category}</TableCell>
						<TableCell>{item.stock}</TableCell>
						<TableCell>{item.price}</TableCell>
						<TableCell className={item.status === "In Stock" ? "text-green-600" : "text-yellow-600"}>{item.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Card>
}

export default function (props: { inventoryItems: InventoryItem[] }) {
	return (
		<>
			<ActionBar />
			<TableView rows={props.inventoryItems} />
		</>
	)
}