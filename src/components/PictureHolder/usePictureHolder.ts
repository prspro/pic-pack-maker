import { useContext, useRef } from "react";
import { PictureDispatchContext } from "../../context/PictureContext";

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
				const response = await fetch(clipboardText);
				const contentType = response.headers.get("content-type");

				if (contentType && contentType.startsWith("image/")) {
					const blob = await response.blob();
					// Creating a local URL from the blob ensures the image
					// stays visible even if the original website blocks hotlinking later
					const localUrl = URL.createObjectURL(blob);
					// handleAddPicture(localUrl);
					return { imageUrl: localUrl, url: clipboardText };
				}
			} catch (error) {
				console.error("Failed to process pasted URL as image:", error);
			}
		}
	}
};

const usePictureHolder = () => {
	const dispatch = useContext(PictureDispatchContext);
	const textInputRef = useRef<HTMLInputElement>(null);

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

		if (textInputRef.current) {
			textInputRef.current.value = "";
		}

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

		if (textInputRef.current) {
			textInputRef.current.value = value.url;
		}

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
		textInputRef,
	};
};

export default usePictureHolder;
