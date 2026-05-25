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
		case "edit-name": {
			return pictures.map((picture) => {
				if (picture.id === action.payload.id) {
					return {
						...picture,
						name: action.payload.name,
					};
				} else {
					return picture;
				}
			});
		}
		case "edit-url": {
			return pictures.map((picture) => {
				if (picture.id === action.payload.id) {
					return {
						...picture,
						url: action.payload.url,
					};
				} else {
					return picture;
				}
			});
		}
		case "edit-value": {
			return pictures.map((picture) => {
				if (picture.id === action.payload.id) {
					return {
						...picture,
						value: action.payload.value,
					};
				} else {
					return picture;
				}
			});
		}
		default:
			throw Error("Unknown action: " + action);
	}
}

export { PicturesReducer };
