import clsx from "clsx";
import { type FC } from "react";
import Container from "../Container";
import Grid from "../Grid";
import PictureHolder from "../PictureHolder";
import usePictures from "./usePictures";
import placeholder from "../../assets/placeholder.svg";
import type { Picture } from "../../types";

interface PicturesProps {
	className?: string;
}

const placeholderData: Picture = {
	id: 0,
	value: placeholder,
	name: "Add picture",
	url: "",
};

const Pictures: FC<PicturesProps> = ({ className }) => {
	const { pictures, handleDownloadPictures } = usePictures();

	return (
		<Container className={clsx([className])}>
			<Grid>
				{pictures?.map((picture, idx) => (
					<Grid.Cell key={idx}>
						<PictureHolder picture={picture} />
					</Grid.Cell>
				))}
				<Grid.Cell>
					<PictureHolder mode={"add"} picture={placeholderData} />
				</Grid.Cell>
				<Grid.Cell>
					<button onClick={handleDownloadPictures}>download</button>
				</Grid.Cell>
			</Grid>
		</Container>
	);
};

export default Pictures;
