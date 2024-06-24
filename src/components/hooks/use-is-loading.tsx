import { useEffect, useState } from "react";

export function useIsLoading() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		return () => clearTimeout(timeout);
	}, []);

	return isLoading;
}
