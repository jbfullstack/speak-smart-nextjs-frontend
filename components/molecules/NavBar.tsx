import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        // backgroundColor: "#f5f5f5",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Add other navbar content here */}
      <div>Logo or Brand Name</div>

      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
