import { useEffect } from "react";
import { useStoreApi } from "reactflow";
import { useZoomToCard } from "./use-zoom-to-card";

export function useListenToNewIdeas({
	postcardId,
	nodeId,
}: {
	postcardId: string;
	nodeId: string;
}) {
	const { addSelectedNodes } = useStoreApi().getState();
	const zoomToCard = useZoomToCard(nodeId);

	useEffect(() => {
		const listener = (event: Event) => {
			if ((event as CustomEvent).detail.id !== postcardId) {
				return;
			}

			zoomToCard();
			addSelectedNodes([nodeId]);
		};

		document.addEventListener("new-idea", listener);

		return () => {
			document.removeEventListener("new-idea", listener);
		};
	}, []);
}
