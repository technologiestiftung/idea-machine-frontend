import React from "react";
import { PrintIcon } from "./icons/print-icon";

export const PrintButton: React.FC = () => {
	return (
		<>
			<button
				id="print-button"
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					console.log("Print");
					// Add print functionality here
				}}
				className="absolute right-6 bottom-4 w-fit h-fit"
			>
				<PrintIcon />
			</button>
		</>
	);
};
