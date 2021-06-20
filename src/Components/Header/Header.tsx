import classes from "./Header.module.css";

const Header = (props:any) => {
  return (
    <div className={classes.container}>
      <p className={classes.headerText}>Users List...</p>
    </div>
  );
};
export default Header;
