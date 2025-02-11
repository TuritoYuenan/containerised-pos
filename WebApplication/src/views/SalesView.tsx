import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function ActionBar() {
	return <div className="flex justify-between">
		<div className="flex gap-2">
			<Dropdown label="Time Period" items={["Today", "This Week", "This Month", "This Year"]} default={1} />
			<Dropdown label="Category" items={["All Categories", "Food", "Beverages", "Desserts"]} default={0} />
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