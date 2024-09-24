import { memo, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

export const Illustration = memo(({ file }: { file: string | null }) => {
	const [publicUrl, setPublicUrl] = useState<string | null>(null);

	useEffect(() => {
		getPublicUrl({ file })
			.then((pubUrl) => {
				setPublicUrl(pubUrl);
			})
			.catch((error) => {
				console.error("Error loading illustration", error);
			});
	}, [file]);

	return (
		<img className="w-4/6 h-auto rounded-md" src={publicUrl || ""} alt={""} />
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
