import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function (props: { subject: string }) {
	return (
		<div className="relative">
			<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input placeholder={`Search ${props.subject}...`} className="pl-8 w-[300px]" />
		</div>
	)
}
