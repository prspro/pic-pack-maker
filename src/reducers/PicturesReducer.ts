import {
	pictureActionMap,
	type Picture,
	type PictureAction,
	type PictureActionType,
} from "../types";

function PicturesReducer(pictures: Picture[], action: PictureAction) {
	switch (action.type) {
		case pictureActionMap.add: {
			const lastId = pictures[pictures.length - 1].id || 0;
			return [
				...pictures,
				{
					// id: action.payload.id,
					id: lastId + 1,
					value: action.payload.value,
					// name: action.payload.name,
					name: (lastId + 1).toString(),
				},
			];
		}
		case pictureActionMap.delete: {
			return pictures.filter((picture) => picture.id !== action.payload.id);
		}
		case pictureActionMap.edit: {
			return pictures.map((picture) => {
				if (picture.id === action.payload.id) {
					return {
						id: picture.id,
						value: action.payload.value,
						name: action.payload.name,
					};
				} else {
					return picture;
				}
			});
		}
		default:
			throw Error("Unknown action: " + action.type);
	}
}

export { PicturesReducer };
