import { useEffect, useRef, useState } from "react";

const useEditField = () => {
	const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
	const nameInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (isNameEditing) {
			nameInputRef.current?.focus();
			nameInputRef.current?.select();
		}
	}, [isNameEditing]);

	const handleEditField = () => {
		setIsNameEditing(true);
	};

	const handleSaveField = () => {
		setIsNameEditing(false);
	};

	return {
		handleEditField,
		handleSaveField,
		isNameEditing,
		nameInputRef,
	};
};

export default useEditField;
