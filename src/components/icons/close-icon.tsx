import React from "react";

export const CloseIcon: React.FC = () => {
	return (
		<div className="w-7 h-7 bg-white rounded-md flex justify-center items-center border-2 border-primaryBlue text-primaryBlue hover:text-hoverBlue hover:border-hoverBlue">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
			>
				<path
					d="M0.725945 0.726203L13.2306 13.2308M0.725945 13.2308L13.2306 0.726203"
					stroke="currentColor"
					strokeWidth="2"
				/>
			</svg>
		</div>
	);
};
