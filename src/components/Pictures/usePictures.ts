import { useContext } from "react";
import { PictureContext } from "../../context/PictureContext";

const usePictures = () => {
	const pictures = useContext(PictureContext);

	return {
		pictures,
	};
};

export default usePictures;
