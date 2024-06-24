import { useEffect } from "react";
import { useNodesInitialized, useReactFlow } from "reactflow";

export function useResetView() {
	const { fitView } = useReactFlow();
	const nodesInitialized = useNodesInitialized();
	useEffect(() => {
		if (nodesInitialized) {
			// Fit view after nodes are initialized and when new nodes are added
			fitView({ padding: 0.1 });
		}
	}, [nodesInitialized]);
}
