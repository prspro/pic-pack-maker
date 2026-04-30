import { createContext, useReducer, type ReactNode } from "react";
import { PicturesReducer, type Picture } from "../reducers/PicturesReducer";
import type { PictureAction } from "../types";

interface PictureProviderProps {
	children: ReactNode | ReactNode[];
}

const initialState = [{ id: 0, value: "", name: "name" }];

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
