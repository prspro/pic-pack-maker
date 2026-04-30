import { useContext } from "react";
import {
	PictureContext,
	PictureDispatchContext,
} from "../../context/PictureContext";
import { pictureActionMap, type PictureActionType } from "../../types";

const usePictures = () => {
	const pictures = useContext(PictureContext);
	const dispatch = useContext(PictureDispatchContext);

	const handleAddPicture = (picture: string) => {
		dispatch?.({
			type: pictureActionMap.add as PictureActionType,
			payload: {
				value: picture,
				name: "test",
			},
		});
	};

	return {
		pictures,
		handleAddPicture,
	};
};

export default usePictures;
