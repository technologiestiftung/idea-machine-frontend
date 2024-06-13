import { Idea } from "../types.ts";
import { Frontside } from "./frontside";
import { Backside } from "./backside";
import { useCallback, useState } from "react";
import { useOnSelectionChange, useNodeId } from "reactflow";

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
		console.log("clicked", nodeId, selectedNodes[0]);
		setIsBackVisible(!isBackVisible);

		onChange({ nodes: [{ id: nodeId }] });
		setIsCurrentPostcardSelected(selectedNodes[0] === nodeId);

		console.log(isCurrentPostcardSelected);
	};

	return (
		<div
			onClick={onPostcardClick}
			className={`w-[423px] h-[300px] border rounded flex flex-col gap-2 shadow-lg relative preserve-3d 
			${isBackVisible ? "my-rotate-y-180 duration-1000" : "my-rotate-y-0 duration-1000"}
			${isCurrentPostcardSelected ? "outline outline-4 outline-focus outline-offset-1 z-10" : "outline-none"}
			`}
		>
			<div className="absolute backface-hidden">
				<Backside data={data} />
				{nodeId}
			</div>

			<div className="absolute my-rotate-y-180 backface-hidden overflow-hidden">
				<Frontside url={data.illustration_url} />
				{nodeId}
			</div>
		</div>
	);
}
