import { memo } from "react";
import placeholder from "../../assets/placeholder.svg";
import styles from "./index.module.sass";
import clsx from "clsx";
import type { Picture } from "../../types";

interface PictureHolderProps {
	className?: string;
	picture: Picture;
}

const PictureHolder = memo(function PictureHolder({
	className,
	picture,
}: PictureHolderProps) {
	// const { preview, name, handlePaste } = usePictureHolder();
	// const pictureList = useContext(PictureContext);

	return (
		<div className={clsx([styles["pic-holder"], className])}>
			<div className={styles["pic-holder__header"]}>
				<p className={styles["pic-holder__name"]}>{picture.name}</p>
				{/* <span>{pictureList?.pictureList.join("-")}</span> */}
			</div>
			<div className={styles["pic-holder__body"]}>
				<img
					className={styles["pic-holder__thumb"]}
					src={picture.value || placeholder}
					alt={""}
				/>
			</div>
			<div className={styles["pic-holder__footer"]}>
				<input
					// onPaste={handlePaste}
					id=""
					name=""
					className={clsx([
						styles["pic-holder__input"],
						styles["pic-holder__input--text"],
					])}
					type="text"
				/>
				<div className={styles["upload"]}>
					<input
						id=""
						name=""
						className={clsx([
							styles["pic-holder__input"],
							styles["pic-holder__input--text"],
							styles["upload__input"],
						])}
						type="file"
						accept="image/*"
					/>
					<i className={styles["upload__icon"]}></i>
				</div>
			</div>
		</div>
	);
});

export default PictureHolder;
