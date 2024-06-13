import { AppTitle } from "../types";

export function Title({ data }: { data: AppTitle }) {
	return (
		<div className="w-[200px] h-[200px] relative">
			<div className="absolut top-0 left-0">
				<div className="bg-white px-2 py-1 rounded-md shadow-lg absolute text-3xl font-bold text-primaryBlue text-center top-0.5 right-0.5">
					{data.title}
				</div>
				<div className="px-2 py-1 rounded-md absolute text-3xl font-bold text-primaryPink text-center ">
					{data.title}
				</div>
			</div>
		</div>
	);
}
