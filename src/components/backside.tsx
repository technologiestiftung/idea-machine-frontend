import { Idea } from "../types";
import { CubeIcon } from "./icons/cube-icon";

const MAX_CHARACTERS = 300;

const checkIdeaLength = (idea: string) => {
	if (idea.length > MAX_CHARACTERS) {
		const first300Chars = idea.substring(0, MAX_CHARACTERS);
		const lastDotIndex = first300Chars.lastIndexOf(".");
		/*
		 * check if lastDotIndex is was found (if not equal to -1) then truncate the string to the last dot
		 * otherwise cut the string at 300 characters
		 */
		const truncatedIdea =
			lastDotIndex !== -1
				? first300Chars.substring(0, lastDotIndex + 1)
				: first300Chars;
		idea = truncatedIdea;
	}
	return idea;
};

export function Backside({ data }: { data: Idea }) {
	const checkedIdea = checkIdeaLength(data.idea);

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
					<div className="bg-primaryBlue w-14 h-14"></div>
					<div className="text-xs text-center">Ideenlink</div>
				</div>
				<div className="flex flex-col gap-8">
					<div className="border-b border-primaryBlue"></div>
					<div className="border-b border-primaryBlue"></div>
					<div className="border-b border-primaryBlue"></div>
				</div>
			</div>
		</div>
	);
}
