// @/components/Layout/Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaUserPlus, FaUsers } from "react-icons/fa";
import { LiaRobotSolid } from "react-icons/lia";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

// import logo from "@/img/logo.svg";
const logo = "/static/logo.svg";

export default function Sidebar({ show, setter }) {
  const sidebarClass = show ? "sidebar visible" : "sidebar";
  const router = useRouter();

  const sideBarStyle = {
    marginLeft: "10px",
  };

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    const { theme, systemTheme } = useTheme();
    const router = useRouter();

    const [activeStyle, setActiveStyle] = useState("");
    const [colorClass, setColorClass] = useState("");

    useEffect(() => {
      const effectiveTheme = theme === "system" ? systemTheme : theme;
      const isDark = effectiveTheme === "dark";
      const isActive = router.asPath === route;

      setActiveStyle(
        isActive
          ? isDark
            ? "bg-gray-700 text-white font-semibold"
            : "bg-gray-300 text-black font-semibold"
          : ""
      );

      setColorClass(
        isActive
          ? isDark
            ? "text-white"
            : "text-black"
          : "text-white/50 hover:text-white"
      );
    }, [theme, systemTheme, route, router.asPath]);

    return (
      <div
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass} ${activeStyle} `}
      >
        <Link href={route} onClick={() => setter((oldVal) => !oldVal)}>
          <div className={`text-xl flex [&>*]:mx-auto w-[30px]`}>{icon}</div>
          <div>{name}</div>
        </Link>
      </div>
    );
  };
  // Overlay to prevent clicks in background, also serves as our close button
  const ModalOverlay = () => (
    <div
      className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0  z-30`}
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${sidebarClass}`}>
        <div className="p-2 flex">
          <Link href="/">
            {/*eslint-disable-next-line*/}
            {/* <img src={logo} alt="Company Logo" width={300} height={300} /> */}
          </Link>
        </div>
        <div className="flex flex-col" style={sideBarStyle}>
          <ThemeSwitcher />
          <MenuItem name="Home" route="/" icon={<LiaRobotSolid />} />
          <MenuItem name="Create" route="/new-jarvis" icon={<FaUserPlus />} />
          <MenuItem name="List" route="/saved-jarvis" icon={<FaUsers />} />
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
