import "@/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
