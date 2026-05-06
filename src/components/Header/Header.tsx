import clsx from "clsx";
import Container from "../Container";
import styles from "./index.module.sass";

const Header = () => {
	return (
		<header className={styles["header"]}>
			<Container className={styles["header__container"]}>
				<span className={styles["header__logo"]}>Header</span>
				<button className={clsx([styles["header__burger"], styles["burger"]])}>
					X
				</button>
			</Container>
		</header>
	);
};

export default Header;
