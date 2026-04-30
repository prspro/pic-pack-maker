interface Picture {
	id: string | number;
	name: string;
	value: string;
}

interface PictureAction {
	type: PictureActionType;
	payload: Picture;
}

type PictureActionType = "add" | "delete" | "edit";

//TODO: this had to be an enum
const pictureActionMap = {
	add: "add",
	delete: "delete",
	edit: "edit",
};

export type { Picture, PictureActionType, PictureAction };
export { pictureActionMap };
