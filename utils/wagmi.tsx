import {
  getDefaultConfig,
  Wallet,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { createConnector } from "@wagmi/core";

// get from https://dashboard.web3auth.io
const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!;

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x" + sepolia.id.toString(16),
  // rpcTarget: process.env.NEXT_PUBLIC_CABINET_SCROLL_SEPORIA_RPC_JSON_API_KEY!,
  rpcTarget: sepolia.rpcUrls.default.http[0],
  displayName: sepolia.name,
  blockExplorer: sepolia.blockExplorers.default.url,
  ticker: sepolia.nativeCurrency?.symbol,
  tickerName: sepolia.nativeCurrency?.name,
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthInstance = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    mode: "dark",
    useLogoLoader: true,
    logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    defaultLanguage: "en",
    theme: {
      primary: "#768729",
    },
    uxMode: UX_MODE.REDIRECT,
    modalZIndex: "2147483647",
  },
});

export const rainbowWeb3AuthConnector = (): Wallet => ({
  id: "web3auth",
  name: "web3auth",
  rdns: "web3auth",
  iconUrl: "https://web3auth.io/images/web3authlog.png",
  iconBackground: "#fff",
  installed: true,
  downloadUrls: {},
  createConnector: (walletDetails: WalletDetailsParams) =>
    createConnector((config) => ({
      ...Web3AuthConnector({
        web3AuthInstance,
      })(config),
      ...walletDetails,
    })),
});

export const config = getDefaultConfig({
  appName: "zkpPay",
  projectId: "zkppay-ethtokyo-2024",
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, rainbowWeb3AuthConnector],
    },
  ],
});
