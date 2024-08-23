"use client";

import { useAccount } from "wagmi";
import WalletAddressField from "../_components/wallet-address-field";
import MoneyComponent from "../_components/money";
import TxRecordRow from "../_components/tx-record-row";

interface TxRecord {
  senderAddress: string;
  date: string;
  amount: number;
}

function Page() {
  const account = useAccount();
  const balance = 1000;

  // isConnectedがfalseの時/loginのページにリダイレクト
  if (!account.isConnected) {
    window.location.href = "/login";
  }

  // TODO: 本来はAPIから取得するが、サンプルデータを使用
  const sampleTxRecord: TxRecord[] = [
    {
      senderAddress: "0x123456",
      date: "2022/01/01",
      amount: 100,
    },
    {
      senderAddress: "0x654321",
      date: "2022/01/02",
      amount: 2200,
    },
    {
      senderAddress: "0x123456",
      date: "2022/01/03",
      amount: 1300,
    },
  ];

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <div className="min-w-[400px]">
          <WalletAddressField address={"test.zkpayuser.eth"} />
          {/* 残高表示エリア */}
          <div className="mt-4">
            <p>S-JPY Balance</p>
            <div className="flex justify-end">
              <MoneyComponent balance={balance} />
            </div>
            <hr className="mt-2" />
          </div>
          {/* 決済履歴表示エリア */}
          <div className="mt-12">
            <h2 className="text-l font-bold">Tx Record</h2>
            {sampleTxRecord.map((txRecord) => (
              <TxRecordRow
                senderAddress={txRecord.senderAddress}
                date={txRecord.date}
                amount={txRecord.amount}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
