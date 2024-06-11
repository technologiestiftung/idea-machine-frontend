import { Illustration } from "./illustration";

export function Frontside({ url }: { url: string | null }) {
	return (
		<div className="w-[423px] h-[300px] bg-white flex justify-center p-4 relative rounded-md">
			<div className="absolute -rotate-6 top-[21px] left-[11.5px] text-sm font-bold text-primaryBlue w-[90px] text-center">
				Grüße aus der Zukunft!
			</div>
			<div className="absolute -rotate-6 top-[20px] left-[12px] text-sm font-bold text-primaryPink w-[90px] text-center">
				Grüße aus der Zukunft!
			</div>
			<Illustration file={url} />
		</div>
	);
}
