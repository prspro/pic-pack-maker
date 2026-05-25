import { useContext } from "react";
import { PictureContext } from "../../context/PictureContext";
import { downloadPictures } from "../../helpers";

const usePictures = () => {
	const pictures = useContext(PictureContext);

	const handleDownloadPictures = async () => {
		if (!pictures) return;
		await downloadPictures(pictures);
	};

	return {
		handleDownloadPictures,
		pictures,
	};
};

export default usePictures;
