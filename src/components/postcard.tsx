import { Idea } from "../types.ts";
import { Illustration } from "./illustration";

export function Postcard({ data }: { data: Idea }) {
	return (
		<div className="w-96 border rounded">
			<Illustration file={data.illustration_url} />
			<div className="italic, p-2">{data.idea}</div>
		</div>
	);
}
