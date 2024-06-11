/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				background: "#EFEFEF",
				primaryPink: "#F64C72",
				primaryBlue: "#2F2FA2",
				primaryYellow: "#F4CD03",
			},
		},
	},
	plugins: [],
};
