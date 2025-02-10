import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BriefCard } from "../lib/types";

export default function ({ items }: { items: BriefCard[] }) {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
			{items.map((item, index) => (
				<Card key={index}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{item.title}</CardTitle>
						<item.icon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{item.value}</div>
						<p className="text-xs text-muted-foreground flex items-center">
							{item.change.startsWith("+") ? (
								<ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
							) : item.change.startsWith("-") ? (
								<ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
							) : null}
							{item.change} from last month
						</p>
					</CardContent>
				</Card>
			))}
		</div>
	)
}