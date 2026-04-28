import { type FC, type ReactNode } from "react";
import styles from "./index.module.sass";

interface GridProps {
	children: ReactNode[] | ReactNode;
}

interface CellProps {
	children: ReactNode[] | ReactNode;
}

interface GridComponent extends FC<GridProps> {
	Cell: FC<CellProps>;
}

const Grid: GridComponent = ({ children }) => {
	return (
		<div className={styles["grid"]}>
			<ul className={styles["grid__list"]}>{children}</ul>
		</div>
	);
};

const Cell: FC<CellProps> = ({ children }) => {
	return <li className={styles["grid__item"]}>{children}</li>;
};

Grid.Cell = Cell;

export default Grid;
