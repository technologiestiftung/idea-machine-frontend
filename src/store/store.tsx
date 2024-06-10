import { supabase } from "../supabase/supabase";
import { Idea } from "../types";

let ideas: Idea[] = [];

export const dbStore = {
	subscribe(renderCallback: () => void) {
		const abortController = new AbortController();

		getIdeas(abortController)
			.then((data) => {
				ideas = [...data];
				renderCallback();
			})
			.catch(console.error);

		const subscription = supabase
			.channel("schema-db-changes")
			.on(
				// @ts-ignore
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "general_overview",
				},
				(data: { new: Idea }) => updateIdeas(data, renderCallback),
			)
			.subscribe();

		return () => {
			abortController.abort();
			subscription.unsubscribe().catch(console.error);
		};
	},

	getSnapshot() {
		return ideas;
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

function updateIdeas(data: { new: Idea }, renderCallback: () => void) {
	const newIdea = data.new;

	ideas = [...ideas, newIdea];
	renderCallback();
}
