import { supabase } from "../supabase/supabase";
import { Row } from "../types";

let rows: Row[] = [];

export const dbStore = {
	subscribe(renderCallback: () => void) {
		const abortController = new AbortController();

		getRows(abortController)
			.then((data) => {
				rows = [...data];
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
				(data: { new: Row }) => updateRows(data, renderCallback),
			)
			.subscribe();

		return () => {
			abortController.abort();
			subscription.unsubscribe().catch(console.error);
		};
	},

	getSnapshot() {
		return rows;
	},
};

async function getRows(abortController: AbortController): Promise<Row[]> {
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

function updateRows(data: { new: Row }, renderCallback: () => void) {
	const newRow = data.new;

	rows = [...rows, newRow];
	renderCallback();
}
