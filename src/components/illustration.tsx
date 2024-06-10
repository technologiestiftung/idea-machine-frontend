import { lazy, Suspense } from "react";
import { supabase } from "../supabase/supabase";

export function Illustration({ file }: { file: string | null }) {
	const SupabaseImage = lazy(async () => {
		const publicUrl = await getPublicUrl({ file });
		return {
			default: () => {
				return <img src={publicUrl || ""} alt={""} />;
			},
		};
	});

	return (
		<Suspense>
			<SupabaseImage />
		</Suspense>
	);
}

async function getPublicUrl({ file }: { file: string | null }) {
	if (!file) {
		return null;
	}

	const { data } = supabase.storage.from("illustrations").getPublicUrl(file);

	return data.publicUrl;
}
