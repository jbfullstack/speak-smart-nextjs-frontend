// @/components/Layout/Sidebar.js
import Link from "next/link";
import { useRouter } from "next/router";

import { FaRedhat, FaTshirt } from "react-icons/fa";
import { SlHome } from "react-icons/sl";
import { ThemeSwitcher } from "../atoms/ThemeSwitcher";

// import logo from "@/img/logo.svg";
const logo = "/static/jarvis-logo.png";

export default function Sidebar({ show, setter }) {
  const sidebarClass = show ? "sidebar visible" : "sidebar";
  const router = useRouter();

  // Define our base class
  const className =
    " w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40";
  // Append class based on state of sidebar visiblity
  const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

  // Clickable menu items
  const MenuItem = ({ icon, name, route }) => {
    // Highlight menu item based on currently displayed route
    const colorClass =
      router.pathname === route
        ? "text-white"
        : "text-white/50 hover:text-white";

    return (
      <Link
        href={route}
        onClick={() => {
          setter((oldVal) => !oldVal);
        }}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass}`}
      >
        <div className="text-xl flex [&>*]:mx-auto w-[30px]">{icon}</div>
        <div>{name}</div>
      </Link>
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
        <div className="flex flex-col">
          <ThemeSwitcher />
          <MenuItem name="Home" route="/" icon={<SlHome />} />
          <MenuItem name="T-Shirts" route="/new-jarvis" icon={<FaTshirt />} />
          <MenuItem name="Hats" route="/saved-jarvis" icon={<FaRedhat />} />
          {/* <MenuItem
            name="About Us"
            route="/create-jarvis"
            icon={<BsInfoSquare />}
          />
          <MenuItem
            name="Contact"
            route="/create-jarvis"
            icon={<BsEnvelopeAt />}
          /> */}
        </div>
      </div>
      {show ? <ModalOverlay /> : <></>}
    </>
  );
}
