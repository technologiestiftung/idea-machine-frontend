import { useEffect, useSyncExternalStore } from "react";
import ReactFlow, { Controls, useNodesState } from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { Title } from "./components/title";
import { dbStore } from "./store/store";
import { InfoButton } from "./components/info-dialog/info-button";
import { InfoDialog } from "./components/info-dialog/info-dialog";

const nodeTypes = { postcard: Postcard, title: Title };

export default function App() {
	const ideaNodes = useSyncExternalStore(
		dbStore.subscribe,
		dbStore.getSnapshot,
	);

	const truncatedIdeaNodes = ideaNodes.slice(0, 10);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);

	useEffect(() => {
		setNodes(truncatedIdeaNodes);
	}, [ideaNodes]);

	const isNotMobile = window.innerWidth > 500;

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
				maxZoom={2}
				selectionOnDrag={true}
			>
				{isNotMobile && <Controls showInteractive={false} />}
			</ReactFlow>
		</div>
	);
}
