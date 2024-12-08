import { ThemeProvider } from "next-themes";
import { NftProvider } from "../context/NftContext";
import Script from "next/script";

import "../styles/globals.css";
import { Navbar, Footer } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <NftProvider>
      <ThemeProvider attribute="class">
        <div className="dark:bg-nft-dark bg-white min-h-screen">
          <Navbar />
          <div className="pt-65">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
        <Script
          src="https://kit.fontawesome.com/adfc1cab73.js"
          crossorigin="anonymous"
        />
      </ThemeProvider>
    </NftProvider>
  );
}

export default MyApp;
