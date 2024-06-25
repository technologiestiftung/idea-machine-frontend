import { useCallback } from "react";
import { useReactFlow, useViewport } from "reactflow";

function getZoomLevel(zoom: number) {
	if (zoom < 1) {
		return 1;
	}

	return zoom;
}

export function useZoomToCard(id: string) {
	const { fitView, getNode } = useReactFlow();
	const { zoom } = useViewport();

	const newZoomLevel = getZoomLevel(zoom);

	const zoomToCard = useCallback(() => {
		const node = getNode(id);
		if (!node) {
			return;
		}
		fitView({ nodes: [node], duration: 1200, maxZoom: newZoomLevel });
	}, [id, zoom]);

	return zoomToCard;
}
