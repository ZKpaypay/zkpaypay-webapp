"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const account = useAccount();
  const router = useRouter();

  // isConnectedがfalseの時/のページにリダイレクト
  if (account.isConnected) {
    router.push("/");
  }

  return account.isConnected ? (
    <>
      <div className="flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      </div>
    </>
  ) : (
    <ConnectButton />
  );
}
