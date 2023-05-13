import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiClient } from "~~/services/web3/wagmiClient";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <WagmiConfig client={wagmiClient}>
      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily:
            "Bariol, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",

          shadows: {
            xs: "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05), 0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1)",
            sm: "0 0.10125rem 0.30375rem rgba(0, 0, 0, 0.05), 0 0.10125rem 0.2025rem rgba(0, 0, 0, 0.1)",
            md: "0 0.1638rem 0.4917rem rgba(0, 0, 0, 0.05), 0 0.1638rem 0.3276rem rgba(0, 0, 0, 0.1)",
            lg: "0 0.2651rem 0.7953rem rgba(0, 0, 0, 0.05), 0 0.2651rem 0.5302rem rgba(0, 0, 0, 0.1)",
            xl: "0 0.4290rem 1.2860rem rgba(0, 0, 0, 0.05), 0 0.4290rem 0.8580rem rgba(0, 0, 0, 0.1)",
          },

          fontSizes: {
            xs: "0.75rem" /* 0.75 * 1.618^0 = 0.75rem */,
            sm: "1.2135rem" /* 0.75 * 1.618^1 ≈ 1.2135rem */,
            md: "1.96282rem" /* 0.75 * 1.618^2 ≈ 1.96282rem */,
            lg: "3.17649rem" /* 0.75 * 1.618^3 ≈ 3.17649rem */,
            xl: "5.13931rem" /* 0.75 * 1.618^4 ≈ 5.13931rem */,
          },

          radius: {
            xs: "0.125rem" /* 0.125 * 1.618^0 = 0.125rem */,
            sm: "0.20225rem" /* 0.125 * 1.618^1 ≈ 0.20225rem */,
            md: "0.32718rem" /* 0.125 * 1.618^2 ≈ 0.32718rem */,
            lg: "0.52933rem" /* 0.125 * 1.618^3 ≈ 0.52933rem */,
            xl: "2rem" /* 0.125 * 1.618^4 ≈ 0.85651rem */,
          },

          spacing: {
            xs: "0.625rem" /* 0.625 * 1.618^0 = 0.625rem */,
            sm: "1.01125rem" /* 0.625 * 1.618^1 ≈ 1.01125rem */,
            md: "1.63504rem" /* 0.625 * 1.618^2 ≈ 1.63504rem */,
            lg: "2.64616rem" /* 0.625 * 1.618^3 ≈ 2.64616rem */,
            xl: "4.28194rem" /* 0.625 * 1.618^4 ≈ 4.28194rem */,
            xxl: "6.93062rem" /* 0.625 * 1.618^5 ≈ 4.28194rem */,
          },

          /* Golden ratio breakpoints */
          breakpoints: {
            xs: "30em" /* 30 * 1.618^0 = 30em */,
            sm: "48.54em" /* 30 * 1.618^1 ≈ 48.54em */,
            md: "78.49em" /* 30 * 1.618^2 ≈ 78.49em */,
            lg: "126.83em" /* 30 * 1.618^3 ≈ 126.83em */,
            xl: "205.17em" /* 30 * 1.618^4 ≈ 205.17em */,
          },

          headings: {
            fontWeight: 700,
            sizes: {
              h1: { fontSize: "9.68310rem", lineHeight: 1.3, fontWeight: undefined },
              h2: { fontSize: "5.98297rem", lineHeight: 1.35, fontWeight: undefined },
              h3: { fontSize: "3.70013rem", lineHeight: 1.4, fontWeight: undefined },
              h4: { fontSize: "2.28872rem", lineHeight: 1.45, fontWeight: undefined },
              h5: { fontSize: "1.41525rem", lineHeight: 1.5, fontWeight: undefined },
              h6: { fontSize: "0.875rem", lineHeight: 1.5, fontWeight: undefined },
            },
          },
        }}
      >
        <NextNProgress />
        <RainbowKitProvider
          chains={appChains.chains}
          avatar={BlockieAvatar}
          theme={isDarkTheme ? darkTheme() : lightTheme()}
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1 bg-white">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
          <Toaster />
        </RainbowKitProvider>
      </MantineProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
