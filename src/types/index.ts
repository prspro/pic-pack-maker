interface Picture {
	id: number;
	name: string;
	value: string;
	url: string;
}

interface PictureAction {
	type: PictureActionType;
	payload: Picture;
}

type PictureActionType = "add" | "delete" | "edit";

type PictureHolderType = "add" | "edit";

export type { Picture, PictureActionType, PictureAction, PictureHolderType };
