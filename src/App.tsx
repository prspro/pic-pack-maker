import { useContext, useReducer, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./components/Grid/Grid";
import PictureHolder from "./components/PictureHolder";
import Container from "./components/Container";
import {
	PictureContext,
	PictureDispatchContext,
	PictureProvider,
} from "./context/PictureContext";
import {
	pictureActionMap,
	type PictureActionType,
} from "./reducers/PicturesReducer";

function App() {
	const pictureList = useContext(PictureContext);
	const dispatch = useContext(PictureDispatchContext);

	const handleAddPicture = (picture: string) => {
		dispatch?.({
			type: pictureActionMap.add as PictureActionType,
			payload: {
				id: 3,
				value: picture,
				name: "test",
			},
		});
	};

	return (
		<>
			<PictureProvider>
				<Container>
					<Grid>
						{pictureList?.map((picture, idx) => (
							<Grid.Cell key={idx}>
								<PictureHolder picture={picture} />
							</Grid.Cell>
						))}
						<Grid.Cell>
							<button onClick={() => handleAddPicture(viteLogo)}>Add</button>
						</Grid.Cell>
						<Grid.Cell>Save</Grid.Cell>
					</Grid>
				</Container>
			</PictureProvider>
		</>
	);
}

export default App;
