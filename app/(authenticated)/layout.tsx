"use client";
import "@/app/globals.css";
import { Providers } from "@/utils/providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>ZKpaypay</title>
      </head>
      <body>
        <Providers>
          <div className="fixed z-50 right-8 top-4">
            <ConnectButton />
          </div>
          <main className="flex justify-center flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
