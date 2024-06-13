import { AppTitle } from "../types";

export function Title({ data }: { data: AppTitle }) {
	return (
		<div className="w-[250px] h-[100px] relative">
			<div className="absolut top-0 left-0">
				<h1 className="bg-white px-2 py-1 rounded-md shadow-lg absolute text-5xl font-bold text-primaryBlue text-center top-0.5 right-0.5">
					{data.title}
				</h1>
				<h1 className="px-2 py-1 rounded-md absolute text-5xl font-bold text-primaryPink text-center ">
					{data.title}
				</h1>
			</div>
		</div>
	);
}
