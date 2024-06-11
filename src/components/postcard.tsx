import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";

export function Postcard({ data }: { data: Idea }) {
	return (
		<div className="w-[423px] h-[600px] border rounded flex flex-col gap-2 shadow-lg">
			<Frontside url={data.illustration_url} />
			<Backside data={data} />
		</div>
	);
}
