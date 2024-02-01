import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
      <NextUIProvider>
        <main className={inter.className}>
          {/* <Navbar /> */}
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
