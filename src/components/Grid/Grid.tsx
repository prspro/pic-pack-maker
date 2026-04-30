import { type FC, type ReactNode } from "react";
import styles from "./index.module.sass";
import clsx from "clsx";

interface GridProps {
	children: ReactNode[] | ReactNode;
	className?: string;
}

interface CellProps {
	children: ReactNode[] | ReactNode;
	className?: string;
}

interface GridComponent extends FC<GridProps> {
	Cell: FC<CellProps>;
}

const Grid: GridComponent = ({ children, className }) => {
	return (
		<div className={clsx([styles["grid"], className])}>
			<ul className={styles["grid__list"]}>{children}</ul>
		</div>
	);
};

const Cell: FC<CellProps> = ({ children, className }) => {
	return (
		<li className={clsx([styles["grid__item"], className])}>{children}</li>
	);
};

Grid.Cell = Cell;

export default Grid;
