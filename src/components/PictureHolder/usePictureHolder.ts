import React, { useState } from "react";

type Props = {};

const usePictureHolder = () => {
	const [preview, setPreview] = useState<string | null>(null);
	const [name, setName] = useState<string>("Name");

	const handlePaste = (event: React.ClipboardEvent) => {
		const items = event.clipboardData.items;

		for (let i = 0; i < items.length; i++) {
			// Check if the pasted item is an image
			if (items[i].type.indexOf("image") !== -1) {
				const file = items[i].getAsFile();
				if (file) {
					// You now have the File object!
					// You can upload it or create a local URL to preview it:
					const imageUrl = URL.createObjectURL(file);
					setPreview(imageUrl);

					const imageName = file.name;
					setName(imageName);

					// Optional: Stop the text from actually being "pasted" into the input
					// event.preventDefault();
				}
			}
		}
	};

	return {
		handlePaste,
		preview,
		name,
	};
};

export default usePictureHolder;
