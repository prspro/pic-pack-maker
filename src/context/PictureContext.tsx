import { createContext, useReducer, type ReactNode } from "react";
import { PicturesReducer } from "../reducers/PicturesReducer";
import type { Picture, PictureAction } from "../types";

interface PictureProviderProps {
	children: ReactNode | ReactNode[];
}

const initialState: Picture[] = [];

//TODO: fix context type
const PictureContext = createContext<Picture[] | null>(null);
const PictureDispatchContext =
	createContext<React.Dispatch<PictureAction> | null>(null);

function PictureProvider({ children }: PictureProviderProps) {
	const [pictureList, dispatch] = useReducer(PicturesReducer, initialState);

	return (
		<PictureContext.Provider value={pictureList}>
			<PictureDispatchContext.Provider value={dispatch}>
				{children}
			</PictureDispatchContext.Provider>
		</PictureContext.Provider>
	);
}

export { PictureContext, PictureDispatchContext, PictureProvider };
