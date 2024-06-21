import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";
import { useCallback, useEffect, useState } from "react";
import {
	useOnSelectionChange,
	Node,
	NodeProps,
	useReactFlow,
	useStoreApi,
} from "reactflow";
import { LoadingCard } from "./loading-card.tsx";

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
	const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

	const onChange = useCallback(({ nodes }: { nodes: Node[] }) => {
		setSelectedNodes(nodes.map((node) => node.id));
	}, []);

	useOnSelectionChange({
		onChange,
	});

	const { fitView, getNode } = useReactFlow();
	const zoomToCard = useCallback(() => {
		const n = getNode(id);
		if (!n) {
			return;
		}
		fitView({ nodes: [n], duration: 1200, maxZoom: 1 });
	}, [getNode]);

	const onPostcardClick = () => {
		setIsBackVisible(!isBackVisible);
		zoomToCard();
	};

	const isCurrentPostcardSelected = selectedNodes[0] === id;

	const [isLoading, setIsLoading] = useState(true);

	const store = useStoreApi();
	const { addSelectedNodes } = store.getState();

	const updateActiveNode = () => {
		addSelectedNodes([id]);
		if (selectedNodes[0] === id) {
			zoomToCard();
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		updateActiveNode();

		return () => clearTimeout(timeout);
	}, []);

	return (
		<div
			className={`${angleVariations[data.medium]} hover:rotate-0 hover:transition-transform duration-500 hover:pointer-events-auto`}
		>
			<div
				onClick={onPostcardClick}
				className={`w-[423px] h-[300px] rounded flex flex-col gap-2 shadow-lg relative preserve-3d 
			${isBackVisible ? "my-rotate-y-180 duration-1000" : "my-rotate-y-0 duration-1000"}
			${isCurrentPostcardSelected ? "outline outline-4 outline-focus outline-offset-1 z-10 rotate-0" : "outline-none"}
			`}
			>
				<div className="absolute backface-hidden">
					{isLoading ? (
						<LoadingCard />
					) : (
						<Backside
							data={data}
							isCurrentPostcardSelected={isCurrentPostcardSelected}
						/>
					)}
				</div>

				<div className="absolute my-rotate-y-180 backface-hidden overflow-hidden">
					<Frontside
						data={data}
						isCurrentPostcardSelected={isCurrentPostcardSelected}
					/>
				</div>
			</div>
		</div>
	);
}
