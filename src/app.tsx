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

// function getZoomLevel(zoom: number) {
// 	if (zoom < 1) {
// 		return 1;
// 	}

// 	return zoom;
// }

export default function App() {
	const ideaNodes = useSyncExternalStore(
		dbStore.subscribe,
		dbStore.getSnapshot,
	);

	// const truncatedIdeaNodes = ideaNodes.slice(0, 10);

	const [nodes, setNodes, onNodesChange] = useNodesState([]);

	useEffect(() => {
		setNodes(ideaNodes);
	}, [ideaNodes]);

	const isNotMobile = window.innerWidth > 500;

	const { fitView } = useReactFlow();

	// do we really need this?
	// const { zoom } = useViewport();
	// const newZoomLevel = getZoomLevel(zoom);

	// https://reactflow.dev/learn/tutorials/slide-shows-with-react-flow#focus-on-click
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
