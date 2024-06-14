import { useEffect, useSyncExternalStore } from "react";
import ReactFlow, { Controls, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { Title } from "./components/title";
import { dbStore } from "./store/store";
import { InfoButton } from "./components/info-dialog/infoButton";
import { InfoDialog } from "./components/info-dialog/infoDialog";

const nodeTypes = { postcard: Postcard, title: Title };

export default function App() {
	const ideaNodes = useSyncExternalStore(
		dbStore.subscribe,
		dbStore.getSnapshot,
	);
	const [nodes, setNodes, onNodesChange] = useNodesState([]);

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
