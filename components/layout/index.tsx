import { Button } from "@nextui-org/react";
import Head from "next/head";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar"; // Adjust the import path as necessary
import mainBodyStyle from "./styles/MainBody.module.scss";
import menuButtonStyle from "./styles/MenuButton.module.scss";
import windowLayoutStyle from "./styles/WindowLayoutStyle.module.scss";


export default function Layout({ pageTitle, children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  const titleConcat = pageTitle ? `${pageTitle} | HMJ` : "HMJ";

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className={`${windowLayoutStyle.window_layout} flex min-h-screen`}>
        <Button className={`${menuButtonStyle.menu_button}`} onClick={toggleSidebar}>
          <FiMenu size={32} />
        </Button>
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className={`${mainBodyStyle.main_body} flex-grow`}>
          {/* Main Content */}
          {children}
        </div>
      </div>
    </>
  );
}
