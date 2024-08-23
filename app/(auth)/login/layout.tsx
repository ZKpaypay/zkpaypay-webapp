import "@/app/globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main className="mx-8 mt-8">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
