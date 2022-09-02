import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);
const infuraId = process.env.INFURA_ID;
const metamask = new MetaMaskConnector({ chains });

const walletconnet = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

const injected = new InjectedConnector({ chains });

const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "react-eth-base",
    provider,
    connectors: [injected, metamask, walletconnet],
    infuraId,
  })
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
