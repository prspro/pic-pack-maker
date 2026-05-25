import { memo } from "react";
import placeholder from "../../assets/placeholder.svg";
import styles from "./index.module.sass";
import clsx from "clsx";
import { type Picture, type PictureHolderType } from "../../types";
import usePictureHolder from "./usePictureHolder";
import EditField from "../EditField";

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
		handlePicturePasteEdit,
		handlePicturePasteAdd,
		handlePictureUploadAdd,
		handlePictureUploadEdit,
		handlePictureDelete,
		handleNameEdit,
		stage,
	} = usePictureHolder();

	return (
		<div className={clsx([styles["pic-holder"], className])}>
			<div className={styles["pic-holder__header"]}>
				<EditField
					isEditable={mode === "add" ? false : true}
					name={picture.name}
					onSave={(arg: string) => handleNameEdit(picture.id, arg)}
					className={styles["pic-holder__name"]}
				/>
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
				<input
					onPaste={(e) => {
						mode === "add"
							? handlePicturePasteAdd(e)
							: handlePicturePasteEdit(e, picture?.id);
					}}
					id=""
					name=""
					className={clsx([
						styles["pic-holder__input"],
						styles["pic-holder__input--paste"],
					])}
					type="text"
				/>
				<i
					className={clsx([
						styles["pic-holder__indicator"],
						styles[`pic-holder__indicator--${stage}`],
					])}
				></i>
			</div>
			<div className={styles["pic-holder__footer"]}>
				<div className={clsx([styles["upload"], styles["pic-holder__upload"]])}>
					<input
						onChange={(e) => {
							mode === "add"
								? handlePictureUploadAdd(e)
								: handlePictureUploadEdit(e, picture?.id);
						}}
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
				{picture.url && (
					<div className={clsx([styles["url"], styles["pic-holder__url"]])}>
						<div className={styles["url__container"]}>
							<p className={clsx([styles["url__value"]])}>
								{/* {picture.url} */}
								{"Has url"}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
});

export default PictureHolder;
