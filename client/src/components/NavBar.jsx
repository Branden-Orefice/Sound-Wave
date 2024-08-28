import Logo from "./Logo";
import SearchBar from "./SearchBar";
import styles from "./NavBar.module.css";

function NavBar({ resetSearchValue }) {
  return (
    <div className={styles.navbar}>
      <Logo />
      <SearchBar resetSearchValue={resetSearchValue} />
    </div>
  );
}

export default NavBar;
