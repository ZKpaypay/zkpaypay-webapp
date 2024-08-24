import "@/app/globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <title>ZKpaypay</title>
      </head>
      <body>
        <main className="flex justify-center flex-col">{children}</main>
      </body>
    </html>
  );
}

export default RootLayout;
