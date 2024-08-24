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
          <main className="flex justify-center flex-col">
            <div className="flex justify-end">
              <ConnectButton />
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
