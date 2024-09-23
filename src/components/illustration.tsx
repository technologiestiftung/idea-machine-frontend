import { lazy, memo, Suspense } from "react";
import { supabase } from "../supabase/supabase";

export const Illustration = memo(({ file }: { file: string | null }) => {
	const SupabaseImage = lazy(async () => {
		const publicUrl = await getPublicUrl({ file });
		return {
			default: () => {
				return (
					<img
						className="w-4/6 h-auto rounded-md"
						src={publicUrl || ""}
						alt={""}
					/>
				);
			},
		};
	});

	return (
		<Suspense>
			<SupabaseImage />
		</Suspense>
	);
});

async function getPublicUrl({ file }: { file: string | null }) {
	if (!file) {
		return null;
	}

	const { data } = supabase.storage
		.from("illustrations")
		.getPublicUrl(file, { transform: { width: 500, height: 500 } });

	return data.publicUrl;
}
