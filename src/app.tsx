import { useCallback, useEffect, useSyncExternalStore } from "react";
import ReactFlow, {
	Controls,
	useNodesState,
	useReactFlow,
	useStoreApi,
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

	const [nodes, setNodes, onNodesChange] = useNodesState([]);

	const { addSelectedNodes } = useStoreApi().getState();

	const { fitView, getNode } = useReactFlow();

	useEffect(() => {
		const listener = (event: Event) => {
			const newNodeID = (event as CustomEvent).detail.id;
			const newNode = getNode(newNodeID);

			if (newNode) {
				fitView({ nodes: [newNode], duration: 1200, maxZoom: 1 });
			}
			addSelectedNodes([newNodeID]);
		};

		document.addEventListener("new-idea", listener);

		return () => {
			document.removeEventListener("new-idea", listener);
		};
	}, []);

	useEffect(() => {
		if (isNotMobile) {
			setNodes(ideaNodes);
			return;
		}

		const truncatedIdeaNodes = ideaNodes.slice(ideaNodes.length - 30, -1);
		setNodes(truncatedIdeaNodes);
	}, [ideaNodes]);

	const handleNodeClick = useCallback<NodeMouseHandler>(
		(_, node) => {
			fitView({ nodes: [node], duration: 1200 });
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
				maxZoom={1.5}
				selectionOnDrag={true}
				onNodeClick={handleNodeClick}
			>
				{isNotMobile && <Controls showInteractive={false} />}
			</ReactFlow>
		</div>
	);
}
