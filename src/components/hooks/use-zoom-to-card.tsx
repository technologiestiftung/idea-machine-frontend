import { useCallback } from "react";
import { useReactFlow } from "reactflow";

export function useZoomToCard(id: string) {
	const { fitView, getNode } = useReactFlow();

	const zoomToCard = useCallback(() => {
		const node = getNode(id);
		if (!node) {
			return;
		}
		fitView({ nodes: [node], duration: 1200, maxZoom: 1 });
	}, [id]);

	return zoomToCard;
}
