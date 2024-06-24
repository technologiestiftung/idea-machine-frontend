import { useCallback, useState } from "react";
import { useOnSelectionChange, OnSelectionChangeFunc, Node } from "reactflow";

export function useSelectedNodes(id: string) {
	const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
	const onChange: OnSelectionChangeFunc = useCallback((params) => {
		const { nodes } = params;
		setSelectedNodes(nodes.map((node: Node) => node.id));
	}, []);
	useOnSelectionChange({
		onChange,
	});

	return selectedNodes[0] === id;
}
