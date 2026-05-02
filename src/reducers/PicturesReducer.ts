import { type Picture, type PictureAction } from "../types";

function PicturesReducer(pictures: Picture[], action: PictureAction) {
	switch (action.type) {
		case "add": {
			const lastId = pictures[pictures.length - 1]?.id || 0;
			return [
				...pictures,
				{
					// id: action.payload.id,
					id: lastId + 1,
					value: action.payload.value,
					// name: action.payload.name,
					name: `picture-${lastId + 1}`,
					url: action.payload.url,
				},
			];
		}
		case "delete": {
			return pictures.filter((picture) => picture.id !== action.payload.id);
		}
		case "edit": {
			return pictures.map((picture) => {
				if (picture.id === action.payload.id) {
					return {
						id: picture.id,
						value: action.payload.value,
						name: action.payload.name,
						url: action.payload.url,
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
