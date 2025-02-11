import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function (props: { label: string, default: number, items: string[] }) {
	return <Select defaultValue={itemID(props.items[props.default])}>
		<SelectTrigger className="w-[180px]">
			<SelectValue placeholder={props.label} />
		</SelectTrigger>
		<SelectContent className="bg-white">
			{props.items.map((item) => (
				<SelectItem key={itemID(item)} value={itemID(item)}>{item}</SelectItem>
			))}
		</SelectContent>
	</Select>
}

function itemID(item: string) {
	return item.toLowerCase().replace(" ", "-");
}
