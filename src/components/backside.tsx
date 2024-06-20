import { Idea } from "../types";
import { CubeIcon } from "./icons/cube-icon";
import { PrintButton } from "./print-button";

const MAX_CHARACTERS = 300;

const truncateIdea = (idea: string) => {
	if (idea.length <= MAX_CHARACTERS) {
		return idea;
	}

	const truncatedIdea = idea.substring(0, MAX_CHARACTERS);

	/**
	 * truncate to the last dot, if possible
	 */
	if (truncatedIdea.includes(".")) {
		const lastDotIndex = truncatedIdea.lastIndexOf(".");
		return truncatedIdea.substring(0, lastDotIndex + 1);
	}

	return truncatedIdea;
};

export function Backside({
	data,
	isCurrentPostcardSelected,
}: {
	data: Idea;
	isCurrentPostcardSelected: boolean;
}) {
	const checkedIdea = truncateIdea(data.idea);

	return (
		<div className="w-[423px] h-[300px] bg-white flex justify-center p-4 relative rounded-md">
			<div className="w-1/2 text-xs border-r border-primaryBlue pr-3 justify-between flex flex-col">
				<div className=" ">{checkedIdea}</div>
				<div className="flex flex-col text-white gap-0.5 text-[10px]">
					<div className="bg-primaryBlue w-fit rounded-full px-1.5 flex flex-row h-4 items-center gap-1">
						<CubeIcon />
						{data.focus_group}
					</div>
					<div className="bg-primaryPink w-fit rounded-full px-1.5 flex flex-row h-4 items-center gap-1">
						<CubeIcon />
						{data.medium}
					</div>
					<div className="bg-primaryYellow w-fit rounded-full px-1.5 flex flex-row h-4 items-center gap-1">
						<CubeIcon />
						{data.topic}
					</div>
				</div>
			</div>
			<div className="w-1/2 flex flex-col justify-between pl-3 pb-16">
				<div className="self-end">
					<div className="outline-dashed outline-primaryBlue w-14 h-16 rounded-md"></div>
				</div>
				<div className="flex flex-col gap-8">
					<div className="border-b border-primaryBlue"></div>
					<div className="border-b border-primaryBlue"></div>
					<div className="border-b border-primaryBlue"></div>
				</div>
			</div>
			{isCurrentPostcardSelected && (
				<PrintButton postcardUrl={data.postcard_url} />
			)}
		</div>
	);
}
