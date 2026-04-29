import clsx from "clsx";
import type { FC, ReactNode } from "react";
import styles from "./index.module.sass";

interface ContainerProps {
	className?: string;
	children: ReactNode | ReactNode[];
}

const Container: FC<ContainerProps> = ({ className, children }) => {
	return <div className={clsx(styles["container"], className)}>{children}</div>;
};

export default Container;
