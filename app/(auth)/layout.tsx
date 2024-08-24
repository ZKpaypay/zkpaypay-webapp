import "@/app/globals.css";
import { Providers } from "@/utils/providers";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <main className="mx-8 mt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
