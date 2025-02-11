import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import SearchBar from "@/components/SearchBar";
import { Employee } from "@/lib/types";

function ActionBar() {
	return <div className="flex justify-between">
		<div className="flex gap-2">
			<SearchBar subject="employees" />
			<Select defaultValue="all">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Role" />
				</SelectTrigger>
				<SelectContent className="bg-white">
					<SelectItem value="all">All Roles</SelectItem>
					<SelectItem value="server">Server</SelectItem>
					<SelectItem value="kitchen">Kitchen</SelectItem>
					<SelectItem value="manager">Manager</SelectItem>
				</SelectContent>
			</Select>
		</div>
		<Button className="rounded bg-black text-white hover:text-black">
			<Plus className="mr-2 h-4 w-4" />
			Add Employee
		</Button>
	</div>
}

function TableView(props: { rows: Employee[] }) {
	return <Card>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Role</TableHead>
					<TableHead>Performance</TableHead>
					<TableHead>Hours</TableHead>
					<TableHead>Status</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{props.rows.map((employee, index) => (
					<TableRow key={index}>
						<TableCell className="font-medium">{employee.name}</TableCell>
						<TableCell>{employee.role}</TableCell>
						<TableCell className="text-green-600">{employee.performance}</TableCell>
						<TableCell>{employee.hours}</TableCell>
						<TableCell>{employee.status}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</Card>
}

export default function (props: { employees: Employee[] }) {
	return <>
		<ActionBar />
		<TableView rows={props.employees} />
	</>
}