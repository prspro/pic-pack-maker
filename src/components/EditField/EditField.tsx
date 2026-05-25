import { useState, type FC } from "react";
import useEditField from "./useEditField";
import styles from "./index.module.sass";
import clsx from "clsx";

interface IEditFieldProps {
	name: string;
	onSave: (newName: string) => void;
	className?: string;
	isEditable?: boolean;
}

const EditField: FC<IEditFieldProps> = ({
	name,
	onSave,
	className,
	isEditable = true,
}) => {
	const { isNameEditing, nameInputRef, handleEditField, handleSaveField } =
		useEditField();
	const [value, setValue] = useState<string>(name);

	return (
		<>
			{isEditable && isNameEditing ? (
				<input
					className={clsx([styles["edit-field"], className])}
					ref={nameInputRef}
					type="text"
					onBlur={() => {
						handleSaveField();
						onSave(value);
					}}
					onChange={(e) => setValue(e.target.value)}
					value={value}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleSaveField();
							onSave(value);
						}
					}}
				/>
			) : (
				<p
					className={clsx([styles["edit-field"], className])}
					onDoubleClick={handleEditField}
				>
					{value}
				</p>
			)}
		</>
	);
};

export default EditField;
