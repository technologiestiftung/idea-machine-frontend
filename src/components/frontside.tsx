import { PrintButton } from "./print-button";
import { Illustration } from "./illustration";
import { Idea } from "../types.ts";

export function Frontside({ data }: { data: Idea }) {
	return (
		<div className="w-[423px] h-[300px] bg-white flex justify-center p-4 relative rounded-md">
			<h4 className="absolute -rotate-6 top-[16px] left-[11.5px] text-lg leading-5 font-bold text-primaryBlue w-[95px] text-center">
				Grüße aus der Zukunft!
			</h4>
			<h4 className="absolute -rotate-6 top-[15px] left-[12px] text-lg leading-5 font-bold text-primaryPink w-[95px] text-center">
				Grüße aus der Zukunft!
			</h4>
			<Illustration file={data.illustration_url} />

			<PrintButton postcardUrl={data.postcard_url} />
		</div>
	);
}
