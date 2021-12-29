import RickAndMortyLogo from "assets/Rick_and_Morty_logo";
import Link from "next/link";
import styles from "./_layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav className={styles["nav"]}>
        <Link href={"/"}>
          <a className={styles["logo-container"]}>
            <RickAndMortyLogo />
          </a>
        </Link>
      </nav>
      <main className={styles["main"]}>{children}</main>
    </>
  );
};

export default Layout;
