import { useContext, useRef, useState } from "react";
import { PictureDispatchContext } from "../../context/PictureContext";

type State = "default" | "error" | "loading";

const usePictureHolder = () => {
	//TODO: revoke unused picture blobs
	const dispatch = useContext(PictureDispatchContext);
	const [stage, setStage] = useState<State>("default");

	const handlePast = async (event: React.ClipboardEvent) => {
		const items = event.clipboardData.items;
		const clipboardText = event.clipboardData.getData("text");

		for (let i = 0; i < items.length; i++) {
			// Check if the pasted item is an image
			if (items[i].type.indexOf("image") !== -1) {
				const file = items[i].getAsFile();
				if (file) {
					// You now have the File object!
					// You can upload it or create a local URL to preview it:
					const imageUrl = URL.createObjectURL(file);
					// handleAddPicture(imageUrl);
					return { imageUrl: imageUrl, url: "" };
				}
			}
		}

		if (clipboardText) {
			// Basic check to see if the text looks like a URL
			const isUrl = /^https?:\/\/.+/i.test(clipboardText);

			if (isUrl) {
				try {
					// We fetch the image to see if it's actually an image
					setStage("loading");
					const response = await fetch(clipboardText);
					const contentType = response.headers.get("content-type");

					if (contentType && contentType.startsWith("image/")) {
						const blob = await response.blob();
						// Creating a local URL from the blob ensures the image
						// stays visible even if the original website blocks hotlinking later
						const localUrl = URL.createObjectURL(blob);
						// handleAddPicture(localUrl);
						setStage("default");
						return { imageUrl: localUrl, url: clipboardText };
					}
				} catch (error) {
					setStage("error");
					console.error("Failed to process pasted URL as image:", error);
				}
			}
			setStage("error");
		}
	};

	const handlePictureDelete = (id: number) => {
		dispatch?.({
			type: "delete",
			payload: {
				id: id,
				name: "",
				value: "",
				url: "",
			},
		});
	};

	const handlePictureAdd = async (event: React.ClipboardEvent) => {
		const value = await handlePast(event);

		if (!value) return;

		setStage("default");

		dispatch?.({
			type: "add",
			payload: {
				value: value.imageUrl,
				//TODO: fix or rework this if possible
				id: 0,
				name: "",
				url: value.url,
			},
		});
	};

	const handlePictureEdit = async (
		event: React.ClipboardEvent,
		id: number,
		name = "edited",
	) => {
		const value = await handlePast(event);

		if (!value) return;

		setStage("default");

		dispatch?.({
			type: "edit",
			payload: {
				id: id,
				name: name,
				value: value.imageUrl,
				url: value.url,
			},
		});
	};

	return {
		handlePictureDelete,
		handlePictureEdit,
		handlePictureAdd,
		stage,
	};
};

export default usePictureHolder;
