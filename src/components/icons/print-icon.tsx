import React from "react";

export const PrintIcon: React.FC<{ isDisabled: boolean }> = ({
	isDisabled,
}) => {
	return (
		<svg
			width="30"
			height="30"
			viewBox="0 0 30 30"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={`w-10 h-10 ${isDisabled ? "bg-gray-700" : "bg-primaryBlue hover:bg-hoverBlue"} rounded-full shadow-lg `}
		>
			<path
				d="M19.9884 11.5989V9C19.9884 8.44772 19.5407 8 18.9884 8H11.6062C11.0539 8 10.6062 8.44772 10.6062 9V11.5989M19.9884 11.5989H21.5946C22.1469 11.5989 22.5946 12.0466 22.5946 12.5989V18.5679C22.5946 19.1202 22.1469 19.5679 21.5946 19.5679H19.9884M19.9884 11.5989H10.6062M19.9884 19.5679V21.1385C19.9884 21.6908 19.5407 22.1385 18.9884 22.1385H11.6062C11.0539 22.1385 10.6062 21.6908 10.6062 21.1385V19.5679M19.9884 19.5679V17.7402C19.9884 17.1879 19.5407 16.7402 18.9884 16.7402H11.6062C11.0539 16.7402 10.6062 17.1879 10.6062 17.7402V19.5679M10.6062 11.5989H9C8.44772 11.5989 8 12.0466 8 12.5989V18.5679C8 19.1202 8.44772 19.5679 9 19.5679H10.6062M18.4247 14.1695H19.9884M12.3328 18.4899H16.8936M12.3328 20.3142H16.8936"
				stroke="white"
				strokeLinecap="round"
			/>
		</svg>
	);
};
