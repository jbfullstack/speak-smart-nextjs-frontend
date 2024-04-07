import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes"; // Adjust the import to your theme context path
import { useEffect, useState } from "react";
import { MoonIcon } from "./Icons/MoonIcon";
import { SunIcon } from "./Icons/SunIcon";
import styles from "./styles/ThemeSwitcherStyle.module.scss";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected
      size="lg"
      //   color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={toggleTheme}
      className={styles.switch}
    >
      {/* {isDark ? "Dark mode" : "Light mode"} */}
    </Switch>
  );
}
