import { useMemo, useSyncExternalStore } from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { dbStore } from "./store/store";

const nodeTypes = { postcard: Postcard };

export default function App() {
	const ideas = useSyncExternalStore(dbStore.subscribe, dbStore.getSnapshot);

	const nodes = useMemo(
		() =>
			ideas.map((row, index) => ({
				id: row.id,
				position: { x: (index % 6) * 500, y: Math.floor(index / 6) * 700 },
				data: row,
				type: "postcard",
			})),
		[ideas],
	);

	return (
		<div className="h-screen w-screen">
			<ReactFlow nodes={nodes} nodeTypes={nodeTypes} />
		</div>
	);
}
