import { useEffect, useState } from "react";
import { useStoreApi } from "reactflow";

export function useIsLoading(id: string) {
	const [isLoading, setIsLoading] = useState(true);

	const store = useStoreApi();
	const { addSelectedNodes } = store.getState();

	const updateActiveNode = () => {
		addSelectedNodes([id]);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		updateActiveNode();

		return () => clearTimeout(timeout);
	}, []);

	return isLoading;
}
