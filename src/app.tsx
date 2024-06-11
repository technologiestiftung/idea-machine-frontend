import { useMemo, useSyncExternalStore } from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { dbStore } from "./store/store";

const nodeTypes = { postcard: Postcard };

const getRandomCircularCoordinates = () => {
	// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
	const t = 2 * Math.PI * Math.random();
	const r = Math.sqrt(Math.random());
	const x = 0.5 + r * Math.cos(t) * 0.75;
	const y = 0.5 + r * Math.sin(t) * 0.75;

	return { x: x * 1500, y: y * 1000 };
};

export default function App() {
	const ideas = useSyncExternalStore(dbStore.subscribe, dbStore.getSnapshot);

	const nodes = useMemo(
		() =>
			ideas.map((row) => ({
				id: row.id,
				position: getRandomCircularCoordinates(),
				data: row,
				type: "postcard",
			})),
		[ideas],
	);

	return (
		<div className="h-screen w-screen bg-background">
			<div className="relative w-0 h-0">
				<div className="absolut">
					<div className="bg-white px-2 py-1 rounded-md shadow-lg absolute top-[11px] left-[11px] text-3xl font-bold text-primaryBlue text-center z-100">
						Würfelideen!
					</div>
					<div className=" px-2 py-1 rounded-md shadow-lg absolute top-[10px] left-[11.5px] text-3xl font-bold text-primaryPink text-center z-100">
						Würfelideen!
					</div>
				</div>
			</div>
			<ReactFlow nodes={nodes} nodeTypes={nodeTypes} minZoom={0} maxZoom={3}>
				<Controls />
			</ReactFlow>
		</div>
	);
}
