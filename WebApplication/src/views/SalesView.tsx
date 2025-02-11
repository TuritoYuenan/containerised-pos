import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ActionBar() {
	return <div className="flex justify-between">
		<div className="flex gap-2">
			<Select defaultValue="week">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Time Period" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectItem value="day">Today</SelectItem>
					<SelectItem value="week">This Week</SelectItem>
					<SelectItem value="month">This Month</SelectItem>
					<SelectItem value="year">This Year</SelectItem>
				</SelectContent>
			</Select>
			<Select defaultValue="all">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectItem value="all">All Categories</SelectItem>
					<SelectItem value="food">Food</SelectItem>
					<SelectItem value="beverages">Beverages</SelectItem>
					<SelectItem value="desserts">Desserts</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<Button className="rounded bg-black text-white hover:text-black">Export Report</Button>
	</div>
}

function TableView(props: { metrics: any[] }) {
	return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{props.metrics.map((card, index) => (
			<Card key={index}>
				<CardHeader>
					<CardTitle>{card.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{card.items.map((item, itemIndex) => (
							<div key={itemIndex} className="flex justify-between">
								<span>{item.name}</span>
								<span className="font-bold">{item.value}</span>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		))}
	</div>
}

export default function (props: { metrics: any[] }) {
	return <>
		<ActionBar />
		<TableView metrics={props.metrics} />
	</>
}