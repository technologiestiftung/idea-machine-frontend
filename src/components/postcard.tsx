import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";
import { useState } from "react";

export function Postcard({ data }: { data: Idea }) {
	const [isBackVisible, setIsBackVisible] = useState(false);

	return (
		<div
			onClick={() => setIsBackVisible(!isBackVisible)}
			className={`w-[423px] h-[300px] border rounded flex flex-col gap-2 shadow-lg relative preserve-3d ${isBackVisible ? "my-rotate-y-180 duration-1000" : "my-rotate-y-0 duration-1000"}`}
		>
			<div className="absolute backface-hidden ">
				<Backside data={data} />
			</div>
			<div className="absolute my-rotate-y-180 backface-hidden overflow-hidden">
				<Frontside url={data.illustration_url} />
			</div>
		</div>
	);
}
