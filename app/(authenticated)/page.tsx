"use client";

import { useAccount } from "wagmi";

function Page() {
  const account = useAccount();

  // isConnectedがfalseの時/loginのページにリダイレクト
  if (!account.isConnected) {
    window.location.href = "/login";
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <h1>zkppay</h1>
        {account.isConnected && (
          <div>
            <div>接続中のアドレス: {account.address}</div>
            <div>{account.chain?.name}に接続中</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
