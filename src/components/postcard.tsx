import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";
import { useState } from "react";
import { NodeProps } from "reactflow";
import { LoadingCard } from "./loading-card.tsx";
import { useIsLoading } from "./hooks/use-is-loading.tsx";
import { useSelectedNodes } from "./hooks/use-selected-nodes.tsx";
import { useResetView } from "./hooks/use-reset-view.tsx";
import { useZoomToCard } from "./hooks/use-zoom-to-card.tsx";
import { useListenToNewIdeas } from "./hooks/use-listen-to-new-ideas.tsx";

const angleVariations: { [key: string]: string } = {
	IoT: "rotate-6",
	Kunstinstallation: "rotate-[10deg]",
	Theaterstück: "rotate-12",
	Veranstaltung: "rotate-[15deg]",
	Robotik: "-rotate-[6deg]",
	Sensorik: "-rotate-[15deg]",
	Spiel: "-rotate-12",
};

export function Postcard({ data, id }: NodeProps<Idea>) {
	const [isBackVisible, setIsBackVisible] = useState(false);
	const isLoading = useIsLoading();
	const isCurrentPostcardSelected = useSelectedNodes(id);
	const zoomToCard = useZoomToCard(id);
	useResetView();
	useListenToNewIdeas({ postcardId: data.id, zoomToCard, nodeId: id });

	const onPostcardClick = () => {
		setIsBackVisible(!isBackVisible);
		zoomToCard();
	};

	return (
		<div
			className={`${angleVariations[data.medium] || "rotate-[4deg]"} hover:rotate-0 hover:transition-transform duration-500 hover:pointer-events-auto`}
		>
			<div
				onClick={onPostcardClick}
				className={`w-[423px] h-[300px] rounded flex flex-col gap-2 shadow-lg relative preserve-3d 
			${isBackVisible ? "my-rotate-y-180 duration-1000" : "my-rotate-y-0 duration-1000"}
			${isCurrentPostcardSelected ? "outline outline-4 outline-focus outline-offset-1 z-10 rotate-0" : "outline-none"}
			`}
			>
				<div className="absolute backface-hidden">
					{isLoading ? <LoadingCard /> : <Backside data={data} />}
				</div>

				<div className="absolute my-rotate-y-180 backface-hidden overflow-hidden">
					<Frontside data={data} />
				</div>
			</div>
		</div>
	);
}
