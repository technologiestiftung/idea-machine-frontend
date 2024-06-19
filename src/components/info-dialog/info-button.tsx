import React from "react";
import { InfoIcon } from "../icons/info-icon";

export const InfoButton: React.FC = () => {
	return (
		<>
			<button
				onClick={() => {
					(
						document.getElementById("infoDialog") as HTMLDialogElement
					).showModal();
				}}
				className="react-flow__panel absolute left-[265px] top-[85px]"
			>
				<InfoIcon />
			</button>
		</>
	);
};
