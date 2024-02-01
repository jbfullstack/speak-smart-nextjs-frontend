import { Button } from "@nextui-org/react";
import Head from "next/head";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./Sidebar"; // Adjust the import path as necessary

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
      <div className="flex min-h-screen">
        <Button className="menu-button" onClick={toggleSidebar}>
          <FiMenu size={32} />
        </Button>
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="flex-grow">
          {/* Main Content */}
          {children}
        </div>
      </div>
    </>
  );
}
