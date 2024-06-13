/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const PostcardFlip = plugin(function ({ addUtilities }) {
	addUtilities({
		".my-rotate-y-180": {
			transform: "rotateY(180deg)",
		},
		".my-rotate-y-0": {
			transform: "rotateY(0deg)",
		},
		".preserve-3d": {
			transformStyle: "preserve-3d",
		},
		".perspective": {
			perspective: "1000px",
		},
		".backface-hidden": {
			backfaceVisibility: "hidden",
		},
	});
});

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#EFEFEF",
				primaryPink: "#F64C72",
				primaryBlue: "#2F2FA2",
				primaryYellow: "#F4CD03",
				focus: "rgba(59, 130, 246, 0.54)",
			},
		},
	},
	plugins: [PostcardFlip],
};
