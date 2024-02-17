import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import router, { useRouter } from "next/router";

import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { FaSignOutAlt, FaUserPlus, FaUsers } from "react-icons/fa";
import { LiaRobotSolid } from "react-icons/lia";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

interface MenuItemProps {
  icon: JSX.Element; // Assuming icons are JSX elements, adjust as necessary
  name: string;
  route?: string; // Making route optional as well, since action items might not have a route
  onClick?: () => void; // Now optional
}

const Sidebar = ({ show, setter }) => {
  const { data: session } = useSession();
  const showLogin = !session;

  const handleLogout = useCallback(async () => {
    await signOut({ redirect: false });
    router.push("/");
  }, []);

  const MenuItem = React.memo<MenuItemProps>(
    ({ icon, name, route, onClick }) => {
      const { theme, systemTheme } = useTheme();
      const [activeStyle, setActiveStyle] = useState("");
      const [colorClass, setColorClass] = useState("");
      const isActive = useRouter().asPath === route;

      useEffect(() => {
        const effectiveTheme = theme === "system" ? systemTheme : theme;
        setActiveStyle(
          isActive
            ? effectiveTheme === "dark"
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-black"
            : ""
        );
        setColorClass(isActive ? "" : "text-white/50 hover:text-white");
      }, [theme, systemTheme, route, isActive]);

      if (onClick) {
        // If onClick is provided, render as button
        return (
          <div
            className={`flex gap-1 text-md pl-6 py-3 border-b-[1px] border-b-white/10 cursor-pointer${colorClass} ${activeStyle}`}
            onClick={onClick}
          >
            {icon}
            <span>{name}</span>
          </div>
        );
      } else {
        // Otherwise, render as Link
        return (
          <Link href={route} passHref>
            <div
              className={`flex gap-1 text-md pl-6 py-3 border-b-[1px] border-b-white/10 cursor-pointer ${colorClass} ${activeStyle}`}
            >
              {icon}
              <span>{name}</span>
            </div>
          </Link>
        );
      }
    }
  );

  return (
    <div className={show ? "sidebar visible" : "sidebar"}>
      {/* Sidebar content */}
      <ThemeSwitcher />
      <MenuItem name="Home" route="/" icon={<LiaRobotSolid />} />
      {showLogin ? (
        <MenuItem name="Login" route="/login" icon={<FaUserPlus />} />
      ) : (
        <>
          <MenuItem name="Create" route="/new-jarvis" icon={<FaUserPlus />} />
          <MenuItem name="List" route="/saved-jarvis" icon={<FaUsers />} />
          <MenuItem
            icon={<FaSignOutAlt />}
            route="/"
            name="Logout"
            onClick={handleLogout}
          />
        </>
      )}
    </div>
  );
};

export default Sidebar;
