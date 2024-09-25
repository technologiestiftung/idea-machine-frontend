import { supabase } from "../supabase/supabase";
import { Idea } from "../types";
import { Node } from "reactflow";

let nodes: Node[] = [];

export const dbStore = {
	subscribe(renderCallback: () => void) {
		const abortController = new AbortController();

		getIdeas(abortController)
			.then((idea) => {
				nodes = idea.map((idea) => toNode(idea));
				renderCallback();
			})
			.catch(console.error);

		const subscription = supabase
			.channel("schema-db-changes")
			.on(
				// @ts-ignore
				"postgres_changes",
				{
					event: "insert",
					schema: "public",
					table: "ideas",
				},
				(data: { new: Idea }) => updateNodes(data, renderCallback),
			)
			.subscribe();

		return () => {
			abortController.abort();
			subscription.unsubscribe().catch(console.error);
		};
	},

	getSnapshot() {
		return nodes;
	},
};

async function getIdeas(abortController: AbortController): Promise<Idea[]> {
	const { data, error } = await supabase
		.from("ideas")
		.select()
		.order("created_at", { ascending: true })
		.abortSignal(abortController.signal);

	if (error) {
		if (abortController.signal.aborted) {
			return [];
		}

		console.error(error);
		return [];
	}

	if (!data) {
		console.error("No data:", data);
		return [];
	}

	return data;
}

function updateNodes(data: { new: Idea }, renderCallback: () => void) {
	const newIdea = data.new;

	nodes = [...nodes, toNode(newIdea)];

	renderCallback();
	setTimeout(
		() =>
			document.dispatchEvent(new CustomEvent("new-idea", { detail: newIdea })),
		500,
	);
}

//
function toNode(idea: Idea): Node {
	return {
		id: idea.id,
		position: getRandomCircularCoordinates(),
		data: idea,
		type: "postcard",
	} as any as Node;
}

function getRandomCircularCoordinates() {
	// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
	const t = 2 * Math.PI * Math.random();
	// r between 0.2 - 1.2 to avoid too many cards in center
	const r = Math.random() + 0.2;
	const x = 0.5 + r * Math.cos(t) * 1200;
	const y = 0.5 + r * Math.sin(t) * 800;
	return { x, y };
}
