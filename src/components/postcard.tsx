import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";
import { useCallback, useState } from "react";
import { useOnSelectionChange, useNodeId } from "reactflow";

const angleVariations: { [key: string]: string } = {
	IoT: "rotate-6",
	Kunstinstallation: "rotate-[10deg]",
	Theaterstück: "rotate-12",
	Veranstaltung: "rotate-[15deg]",
	Robotik: "-rotate-[6deg]",
	Sensorik: "-rotate-[15deg]",
	Spiel: "-rotate-12",
};

export function Postcard({ data }: { data: Idea }) {
	const [isBackVisible, setIsBackVisible] = useState(false);
	const [isCurrentPostcardSelected, setIsCurrentPostcardSelected] =
		useState(false);

	const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
	const nodeId = useNodeId();

	const onChange = useCallback(({ nodes }: { nodes: any[] }) => {
		setSelectedNodes(nodes.map((node: any) => node.id));
	}, []);

	useOnSelectionChange({
		onChange,
	});

	const onPostcardClick = () => {
		console.log("selectedNodes", selectedNodes);
		console.log("clicked", nodeId, selectedNodes[0]);
		setIsBackVisible(!isBackVisible);

		onChange({ nodes: [{ id: nodeId }] });
		setIsCurrentPostcardSelected(selectedNodes[0] === nodeId);

		console.log(isCurrentPostcardSelected);
	};

	return (
		<div
			className={` ${angleVariations[data.medium]} hover:rotate-0 hover:transition-transform duration-500`}
		>
			<div
				onClick={onPostcardClick}
				className={`w-[423px] h-[300px] border rounded flex flex-col gap-2 shadow-lg relative preserve-3d 
			${isBackVisible ? "my-rotate-y-180 duration-1000" : "my-rotate-y-0 duration-1000"}
			${isCurrentPostcardSelected ? "outline outline-4 outline-focus outline-offset-1 z-10 rotate-0" : "outline-none"}
			`}
			>
				<div className="absolute backface-hidden">
					<Backside data={data} />
				</div>

				<div className="absolute my-rotate-y-180 backface-hidden overflow-hidden">
					<Frontside url={data.illustration_url} />
				</div>
			</div>
		</div>
	);
}
