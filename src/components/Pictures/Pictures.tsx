import clsx from "clsx";
import { type FC } from "react";
import Container from "../Container";
import Grid from "../Grid";
import PictureHolder from "../PictureHolder";
import usePictures from "./usePictures";
import placeholder from "../../assets/placeholder.svg";

interface PicturesProps {
	className?: string;
}

const Pictures: FC<PicturesProps> = ({ className }) => {
	const { pictures, handleAddPicture } = usePictures();

	return (
		<Container className={clsx([className])}>
			<Grid>
				{pictures?.map((picture, idx) => (
					<Grid.Cell key={idx}>
						<PictureHolder picture={picture} />
					</Grid.Cell>
				))}
				<Grid.Cell>
					<button onClick={() => handleAddPicture(placeholder)}>Add</button>
				</Grid.Cell>
				<Grid.Cell>Save</Grid.Cell>
			</Grid>
		</Container>
	);
};

export default Pictures;
