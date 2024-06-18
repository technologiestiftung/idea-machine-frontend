import { CubeIcon } from "./icons/cube-icon";

export function LoadingCard() {
	return (
		<div className="w-[423px] h-[300px] bg-white flex justify-center p-4 relative rounded-md">
			<div className="w-1/2 border-r border-skeleton pr-3 justify-center flex flex-col gap-2">
				<div className="flex flex-row text-white gap-2 justify-center">
					<div className="text-primaryBlue">
						<CubeIcon className="w-4 h-4" />
					</div>
					<div className="text-primaryYellow">
						<CubeIcon className="w-4 h-4" />
					</div>
					<div className="text-primaryPink">
						<CubeIcon className="w-4 h-4" />
					</div>
				</div>
				<p className="text-xs text-center w-1/2 self-center">
					Deine Idee wird generiert...
				</p>
			</div>
			<div className="w-1/2 flex flex-col justify-between pl-3 pb-16">
				<div className="self-end">
					<div className="outline-dashed outline-skeleton w-14 h-16 rounded-md"></div>
				</div>
				<div className="flex flex-col gap-8">
					<div className="border-b border-skeleton"></div>
					<div className="border-b border-skeleton"></div>
					<div className="border-b border-skeleton"></div>
				</div>
			</div>
		</div>
	);
}
