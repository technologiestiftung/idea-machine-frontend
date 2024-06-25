import { CubeIcon } from "./icons/cube-icon";

export function LoadingCardFront() {
	return (
		<div className="w-[423px] h-[300px] bg-white flex justify-center p-4 relative rounded-md">
			<div className="w-1/2 pr-3 justify-center flex flex-col gap-2">
				<div className="flex flex-row text-white gap-2 justify-center">
					<CubeIcon className="w-4 h-4 text-primaryBlue animate-rollDice" />
					<CubeIcon className="w-4 h-4 text-primaryYellow animate-rollDice animation-delay-250" />
					<CubeIcon className="w-4 h-4 text-primaryPink animate-rollDice animation-delay-500" />
				</div>
				<p className="text-xs text-center w-1/2 self-center">
					Deine Idee wird generiert...
				</p>
			</div>
		</div>
	);
}
