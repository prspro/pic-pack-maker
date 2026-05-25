import JSZip from "jszip";
import type { Picture } from "../types";

async function downloadPictures(list: Picture[]) {
	const zip = new JSZip();

	await Promise.all(
		list.map(async (picture) => {
			const blob = await fetch(picture.value).then((r) => r.blob());
			const ext = blob.type.split("/")[1];
			zip.file(`${picture.name}.${ext}`, blob);
		}),
	);

	const zipBlob = await zip.generateAsync({ type: "blob" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(zipBlob);
	link.download = "pictures.zip";
	link.click();

	// Clean up
	URL.revokeObjectURL(link.href);
}

export { downloadPictures };
