/* eslint-disable react/react-in-jsx-scope */
import { useCallback, useEffect, useSyncExternalStore } from "react";
import ReactFlow, {
	Controls,
	useNodesState,
	useReactFlow,
	type NodeMouseHandler,
} from "reactflow";
import "reactflow/dist/style.css";
import { Postcard } from "./components/postcard";
import { Title } from "./components/title";
import { dbStore } from "./store/store";
import { InfoButton } from "./components/info-dialog/info-button";
import { InfoDialog } from "./components/info-dialog/info-dialog";
import { useResetView } from "./components/hooks/use-reset-view";

const nodeTypes = { postcard: Postcard, title: Title };

export default function App() {
	const isNotMobile = window.innerWidth > 500;

	const ideaNodes = useSyncExternalStore(
		dbStore.subscribe,
		dbStore.getSnapshot,
	);

	const truncatedIdeaNodes = ideaNodes.slice(ideaNodes.length - 30, -1);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);

	useEffect(() => {
		if (isNotMobile) {
			setNodes(ideaNodes);
			return;
		}

		setNodes(truncatedIdeaNodes);
	}, [ideaNodes]);

	const { fitView } = useReactFlow();

	const handleNodeClick = useCallback<NodeMouseHandler>(
		(_, node) => {
			fitView({ nodes: [node], duration: 1200, maxZoom: 1 });
		},
		[fitView],
	);

	useResetView();

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
				onNodeClick={handleNodeClick}
			>
				{isNotMobile && <Controls showInteractive={false} />}
			</ReactFlow>
		</div>
	);
}
