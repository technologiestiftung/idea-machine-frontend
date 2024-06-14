import { useEffect, useMemo, useSyncExternalStore } from "react";
import ReactFlow, { Controls, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { Title } from "./components/title";
import { dbStore } from "./store/store";
import { InfoButton } from "./components/info-dialog/infoButton";
import { InfoDialog } from "./components/info-dialog/infoDialog";

const nodeTypes = { postcard: Postcard, title: Title };

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
	const [nodes, setNodes, onNodesChange] = useNodesState([]);

	const ideaNodes = useMemo(
		() =>
			ideas.map((row) => ({
				id: row.id,
				position: getRandomCircularCoordinates(),
				data: row,
				draggable: true,
				type: "postcard",
				selectable: true,
			})),
		[ideas],
	);

	useEffect(() => {
		setNodes(ideaNodes);
	}, [ideaNodes]);

	return (
		<div className="h-screen w-screen bg-background">
			<Title />
			<InfoButton />
			<InfoDialog />
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				onNodesChange={onNodesChange}
				minZoom={0}
				maxZoom={3}
			>
				<Controls showInteractive={false} />
			</ReactFlow>
		</div>
	);
}
