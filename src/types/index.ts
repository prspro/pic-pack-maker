interface Picture {
	id: number;
	name: string;
	value: string;
	url: string;
}

type AddAction = {
	type: "add";
	payload: { value: string; url: string };
};

type DeleteAction = {
	type: "delete";
	payload: { id: number };
};

type EditNameAction = {
	type: "edit-name";
	payload: { id: number; name: string };
};

type EditUrlAction = {
	type: "edit-url";
	payload: { id: number; url: string };
};

type EditValueAction = {
	type: "edit-value";
	payload: { id: number; value: string };
};

type PictureAction =
	| AddAction
	| DeleteAction
	| EditNameAction
	| EditUrlAction
	| EditValueAction;

type PictureActionType =
	| "add"
	| "delete"
	| "edit"
	| "edit-name"
	| "edit-url"
	| "edit-value";

type PictureHolderType = "add" | "edit";

export type { Picture, PictureActionType, PictureAction, PictureHolderType };
