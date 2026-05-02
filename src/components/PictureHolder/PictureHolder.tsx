import { memo } from "react";
import placeholder from "../../assets/placeholder.svg";
import styles from "./index.module.sass";
import clsx from "clsx";
import { type Picture, type PictureHolderType } from "../../types";
import usePictureHolder from "./usePictureHolder";

interface PictureHolderProps {
	className?: string;
	picture: Picture;
	mode?: PictureHolderType;
}

const PictureHolder = memo(function PictureHolder({
	className,
	picture,
	mode = "edit",
}: PictureHolderProps) {
	const {
		handlePictureDelete,
		handlePictureAdd,
		handlePictureEdit,
		textInputRef,
	} = usePictureHolder();

	return (
		<div className={clsx([styles["pic-holder"], className])}>
			<div className={styles["pic-holder__header"]}>
				<p className={styles["pic-holder__name"]}>{picture.name}</p>
				{mode !== "add" && (
					<button
						onClick={() => picture.id && handlePictureDelete(picture.id)}
						className={styles["pic-holder__delete"]}
					></button>
				)}
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
					// ref={textInputRef}
					value={picture.url || ""}
					onPaste={(e) => {
						mode === "add"
							? handlePictureAdd(e)
							: handlePictureEdit(e, picture?.id);
					}}
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
