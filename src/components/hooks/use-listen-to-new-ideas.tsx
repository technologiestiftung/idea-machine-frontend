import { useEffect } from "react";
import { useStoreApi } from "reactflow";

export function useListenToNewIdeas({
	postcardId,
	nodeId,
	zoomToCard,
}: {
	postcardId: string;
	nodeId: string;
	zoomToCard: () => void;
}) {
	const { addSelectedNodes } = useStoreApi().getState();

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
