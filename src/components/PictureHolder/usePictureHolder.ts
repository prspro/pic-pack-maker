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
			},
		});
	};

	const handlePicturePasteAdd = async (event: React.ClipboardEvent) => {
		const value = await handlePast(event);

		if (!value) return;

		setStage("default");

		dispatch?.({
			type: "add",
			payload: {
				value: value.imageUrl,
				url: value.url,
			},
		});
	};

	const handlePicturePasteEdit = async (
		event: React.ClipboardEvent,
		id: number,
	) => {
		const value = await handlePast(event);

		if (!value) return;

		setStage("default");

		dispatch?.({
			type: "edit-value",
			payload: {
				id: id,
				value: value.imageUrl,
			},
		});
		dispatch?.({
			type: "edit-url",
			payload: {
				id: id,
				url: value.url,
			},
		});
	};

	const handlePictureUploadAdd = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		//TODO: if file is the same, as previous, looks like no change is triggered so nothing happens
		const fileList = event.target.files;

		if (fileList && fileList.length > 0) {
			const file = fileList[0];
			const imageUrl = URL.createObjectURL(file);

			//all is fine
			setStage("default");

			//clearing input value
			event.target.value = "";

			dispatch?.({
				type: "add",
				payload: {
					value: imageUrl,
					url: "",
				},
			});
		}
	};

	const handlePictureUploadEdit = (
		event: React.ChangeEvent<HTMLInputElement>,
		id: number,
	) => {
		const fileList = event.target.files;

		if (fileList && fileList.length > 0) {
			const file = fileList[0];
			const imageUrl = URL.createObjectURL(file);

			//all is fine
			setStage("default");

			//clearing input value
			event.target.value = "";

			dispatch?.({
				type: "edit-value",
				payload: {
					id: id,
					value: imageUrl,
				},
			});
			dispatch?.({
				type: "edit-url",
				payload: {
					id: id,
					url: "",
				},
			});
		}
	};

	const handleNameEdit = (id: number, name: string) => {
		dispatch?.({
			type: "edit-name",
			payload: {
				id: id,
				name: name,
			},
		});
	};

	return {
		//paste
		handlePicturePasteEdit,
		handlePicturePasteAdd,
		//upload
		handlePictureUploadAdd,
		handlePictureUploadEdit,
		//misc
		handlePictureDelete,
		handleNameEdit,
		stage,
	};
};

export default usePictureHolder;
