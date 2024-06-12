import { useSyncExternalStore } from "react";
import ReactFlow, { Controls } from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { dbStore } from "./store/store";

const nodeTypes = { postcard: Postcard };

export default function App() {
	const nodes = useSyncExternalStore(dbStore.subscribe, dbStore.getSnapshot);

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
