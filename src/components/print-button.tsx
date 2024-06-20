import React from "react";
import { PrintIcon } from "./icons/print-icon";
import { supabase } from "../supabase/supabase";

export const PrintButton: React.FC<{ postcardUrl: string | null }> = ({
	postcardUrl,
}) => {
	const isPrintButtonVisible = window.location.pathname === "/soko24";

	const [isDisabled, setIsDisabled] = React.useState(false);

	const handleClick = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		e.stopPropagation();

		setIsDisabled(true);

		const { error } = await supabase.from("printing_jobs").insert({
			postcard_url: postcardUrl,
		});

		if (error) {
			console.error(error);
		}

		setTimeout(() => setIsDisabled(false), 5000);
	};

	return (
		<>
			{isPrintButtonVisible && (
				<button
					id="print-button"
					type="button"
					onClick={handleClick}
					disabled={isDisabled}
					className="absolute right-6 bottom-4 w-fit h-fit"
				>
					<PrintIcon isDisabled={isDisabled} />
				</button>
			)}
		</>
	);
};
