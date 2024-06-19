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

const animationDelay = plugin(function ({ addUtilities }) {
	addUtilities({
		".animation-delay-250": {
			animationDelay: "0.25s",
		},
		".animation-delay-500": {
			animationDelay: "0.5s",
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
				hoverBlue: "#7474b2",
				skeleton: "#EAEAF6",
			},
			animation: {
				rollDice: "jumpAndSpin 1.5s ease infinite",
			},
			keyframes: {
				jumpAndSpin: {
					"0%": {
						transform: "translateY(0) rotate(0deg)",
					},
					"50%": {
						transform: "translateY(-50px) rotate(360deg)",
					},
					"100%": {
						transform: "translateY(0) rotate(360deg)",
					},
				},
			},
		},
	},
	plugins: [PostcardFlip, animationDelay],
};
